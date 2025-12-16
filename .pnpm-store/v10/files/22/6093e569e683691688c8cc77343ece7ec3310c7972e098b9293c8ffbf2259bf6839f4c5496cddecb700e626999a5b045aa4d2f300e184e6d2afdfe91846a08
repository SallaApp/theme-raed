/*!
 * Crafted with ❤ by Salla
 */
import { Host, h } from "@stencil/core";
import { DiscountType } from "./interfaces";
import { TIERED_OFFER_CONFIG } from "./constants";
import { TierUtils } from "./utils";
export class SallaTieredOffer {
    constructor() {
        this.currentTierIndex = 0;
        this.canRender = false;
        this.isLoading = false;
        this.handleTabClick = (tierName) => {
            this.activeTabTier = tierName;
        };
        salla.lang.onLoaded(() => {
            this.loyaltyProgramText = salla.lang.get('blocks.tiered_offer.program_title');
            this.currentTierText = salla.lang.get('blocks.tiered_offer.current_tier');
            this.discountText = salla.lang.get('blocks.tiered_offer.discount');
            this.benefitText = salla.lang.get('blocks.tiered_offer.tier_description');
        });
    }
    async componentWillLoad() {
        try {
            await salla.onReady();
            if (!this.checkFeatureEnabled()) {
                return;
            }
            if (!this.checkCartExists()) {
                return;
            }
            this.isLoading = true;
            const offerData = await this.fetchTieredOfferData();
            if (!offerData) {
                return;
            }
            this.initializeComponent(offerData);
        }
        catch (error) {
            this.canRender = false;
            salla.logger.warn('salla-tiered-offer:: ', error);
        }
        finally {
            this.isLoading = false;
        }
    }
    checkFeatureEnabled() {
        return salla.config.get('store.features')?.includes('tiered-offer');
    }
    checkCartExists() {
        return !!salla.storage.get("cart")?.summary?.count;
    }
    validateCouponCompatibility(offerData, cartCoupon) {
        // If coupon is applied but offer doesn't support coupons, widget should be hidden
        return !(cartCoupon && !offerData.details?.applied_with_coupon);
    }
    async fetchTieredOfferData() {
        try {
            const { data } = await salla.api.cart.offers();
            const tieredOffer = data.find(offer => offer.type === "tiered_offer");
            if (!tieredOffer) {
                return null;
            }
            // Hide widget if coupon is applied and offer doesn't support coupons
            if (!this.validateCouponCompatibility(tieredOffer, salla.storage.get("cart")?.coupon)) {
                this.canRender = false;
                return null;
            }
            return tieredOffer;
        }
        catch (error) {
            throw error;
        }
    }
    initializeComponent(apiOfferData) {
        this.apiOfferData = apiOfferData;
        // Map tiered details data to component format
        this.tieredOfferData = this.mapApiDataToTiers(this.apiOfferData);
        this.loyaltyProgramText = this.apiOfferData.title || this.loyaltyProgramText;
        // Find current tier index based on current_value from API
        const currentValue = this.apiOfferData.details?.current_value || 0;
        const currentTierIndex = this.findCurrentTierIndex(currentValue);
        // Only render if user has reached at least the first tier
        if (currentTierIndex === 0) {
            this.canRender = false;
            return;
        }
        this.currentTierIndex = currentTierIndex;
        this.currentTier = TierUtils.getTierNameByIndex(this.tieredOfferData.tiers, currentTierIndex);
        this.activeTabTier = this.currentTier;
        this.canRender = true;
    }
    componentDidLoad() {
        salla.event.on("cart::updated", async (updatedCart) => {
            const offerData = await this.fetchTieredOfferData();
            if (offerData) {
                this.updateOfferValues(updatedCart, offerData);
            }
        });
    }
    mapApiDataToTiers(apiData) {
        // Sort discounts by min_spend to create proper tier order
        const sortedDiscounts = [...apiData.details.discounts].sort((a, b) => a.min_spend - b.min_spend);
        const tiers = sortedDiscounts.map((discount, index) => ({
            name: discount.name,
            tier_name: discount.name,
            discount: discount.type === DiscountType.PERCENTAGE ? `${salla.helpers.number(discount.value)}%` : salla.money(discount.value),
            icon: TIERED_OFFER_CONFIG.staticIcons[index] || TIERED_OFFER_CONFIG.staticIcons[0],
            threshold: discount.min_spend,
            text_color: TIERED_OFFER_CONFIG.staticColors[index],
            index: index + 1
        }));
        return {
            current_tier: TierUtils.getTierNameByIndex(tiers, this.findCurrentTierIndex(apiData.details.current_value, tiers)),
            tiers
        };
    }
    findCurrentTierIndex(currentValue, tiers = this.tieredOfferData?.tiers) {
        return TierUtils.findCurrentTierIndex(currentValue, tiers || []);
    }
    updateOfferValues(updatedCart, freshOfferData) {
        if (!freshOfferData || !this.tieredOfferData) {
            return;
        }
        // Check coupon compatibility
        if (!this.validateCouponCompatibility(freshOfferData, updatedCart.coupon)) {
            this.canRender = false;
            return;
        }
        // If no coupon conflict, show widget
        this.canRender = true;
        // Check if this offer should update with cart changes
        if (freshOfferData.details?.with_current_cart === false) {
            return;
        }
        // Update current_value in API offer data
        //  const currentValue = updatedCart.sub_total;
        //  console.log('currentValue #####3', currentValue);
        //  this.apiOfferData = {
        //    ...this.apiOfferData,
        //    details: {
        //      ...this.apiOfferData.details,
        //      current_value: currentValue
        //    }
        //  };
        // Use current_value from fresh API data instead of cart sub_total
        const currentValue = freshOfferData.details?.current_value || 0;
        this.apiOfferData = freshOfferData;
        // Update current tier based on new value
        const newTierIndex = this.findCurrentTierIndex(currentValue);
        // Check if user qualifies for any tier
        if (newTierIndex === 0) {
            this.canRender = false;
            return;
        }
        // user qualifies show widget
        this.canRender = true;
        this.currentTierIndex = newTierIndex;
        this.currentTier = TierUtils.getTierNameByIndex(this.tieredOfferData.tiers, newTierIndex);
        // Update active tab if needed
        if (this.activeTabTier !== this.currentTier) {
            this.activeTabTier = this.currentTier;
        }
    }
    getLoadingSkeletonView() {
        return h(Host, null, h("div", { class: "s-tiered-offer-container" }, h("div", { class: "s-tiered-offer-skeleton-wrapper" }, h("div", { class: "s-tiered-offer-skeleton-title" }, h("salla-skeleton", { height: "16px", width: "40%" })), h("div", { class: "s-tiered-offer-skeleton-subtitle" }, h("salla-skeleton", { height: "20px", width: "60%" })), h("div", { class: "s-tiered-offer-skeleton-progress" }, h("salla-skeleton", { height: "16px", width: "100%" })), h("div", { class: "s-tiered-offer-skeleton-tabs" }, h("salla-skeleton", { height: "50px", width: "100%" })))));
    }
    getCurrentTierData() {
        return TierUtils.findTierByIndex(this.tieredOfferData.tiers, this.currentTierIndex) || this.tieredOfferData.tiers[0];
    }
    getProgressWidth() {
        const currentValue = this.apiOfferData.details?.current_value || 0;
        const totalTiers = this.tieredOfferData.tiers.length;
        // Use existing method to find current tier index (which already handles the logic)
        const currentTierIndex = this.findCurrentTierIndex(currentValue);
        // Convert to 0-based index for progress calculation
        const completedTiers = currentTierIndex;
        return (completedTiers / totalTiers) * 100;
    }
    calculateMilestonePosition(index, totalTiers) {
        if (totalTiers === 1) {
            return 'calc(100% - 18px)';
        }
        const milestonePercent = ((index + 1) / totalTiers) * 100;
        const offsetPercent = 8 / totalTiers;
        return `${Math.max(2, Math.min(95, milestonePercent - offsetPercent))}%`;
    }
    getMilestoneStyles(tier, index, totalTiers) {
        const isRtl = document.documentElement.dir === 'rtl';
        const adjustedPercent = this.calculateMilestonePosition(index, totalTiers);
        const alignItems = tier.name.length > 6 ? 'flex-end' : 'center';
        return {
            [isRtl ? 'right' : 'left']: adjustedPercent,
            alignItems,
            position: 'absolute',
            transform: isRtl ? 'translateX(50%)' : 'translateX(-50%)'
        };
    }
    getMilestoneIconStyles(tier, isCurrent, isReached) {
        if (isCurrent) {
            return { color: tier.text_color };
        }
        if (isReached) {
            return { color: 'var(--color-primary)' };
        }
        return {};
    }
    renderProgressBarBackground(progressWidth) {
        return [
            h("div", { class: "s-tiered-offer-progress-bg" }),
            h("div", { class: "s-tiered-offer-progress-fill", style: { width: `${progressWidth}%` } })
        ];
    }
    renderMilestoneIcon(tier, isCurrent, isReached) {
        const iconClasses = [
            's-tiered-offer-milestone-icon',
            isCurrent ? 's-tiered-offer-milestone-active' : '',
            isReached ? 's-tiered-offer-milestone-completed' : ''
        ].filter(Boolean).join(' ');
        return (h("div", { class: iconClasses, style: this.getMilestoneIconStyles(tier, isCurrent, isReached) }, h("span", { innerHTML: tier.icon })));
    }
    renderMilestoneName(tier, isCurrent) {
        return (h("div", { class: "s-tiered-offer-milestone-name" }, isCurrent && (h("span", { style: { color: tier.text_color } }, tier.name))));
    }
    renderMilestones(currentValue, totalTiers) {
        const containerClass = totalTiers === 1
            ? 's-tiered-offer-single-milestone-justify-end'
            : 's-tiered-offer-milestones';
        return (h("div", { class: "s-tiered-offer-milestones-wrapper" }, h("div", { class: containerClass }, this.tieredOfferData.tiers.map((tier, index) => {
            const isReached = currentValue >= tier.threshold;
            const isCurrent = tier.tier_name === this.currentTier;
            return (h("div", { class: "s-tiered-offer-milestone", style: this.getMilestoneStyles(tier, index, totalTiers) }, this.renderMilestoneIcon(tier, isCurrent, isReached), this.renderMilestoneName(tier, isCurrent)));
        }))));
    }
    renderProgressBar() {
        const progressWidth = this.getProgressWidth();
        const totalTiers = this.tieredOfferData.tiers.length;
        const currentValue = this.apiOfferData.details?.current_value || 0;
        return (h("div", { class: "s-tiered-offer-progress-container" }, h("div", { class: "s-tiered-offer-progress-wrapper" }, this.renderProgressBarBackground(progressWidth), this.renderMilestones(currentValue, totalTiers))));
    }
    renderTabs() {
        return (h("div", { class: "s-tiered-offer-tabs-container" }, h("div", { class: "s-tiered-offer-tab-headers" }, this.tieredOfferData.tiers.map(tier => {
            const isActive = tier.tier_name === this.activeTabTier;
            return (h("button", { class: `s-tiered-offer-tab-header ${isActive ? 's-tiered-offer-tab-active' : ''}`, onClick: () => this.handleTabClick(tier.tier_name) }, h("span", null, tier.name)));
        })), h("div", { class: "s-tiered-offer-tab-content-wrapper" }, (() => {
            const activeTier = TierUtils.findTierByName(this.tieredOfferData.tiers, this.activeTabTier);
            if (!activeTier)
                return null;
            return (h("div", { class: "s-tiered-offer-tab-content" }, h("div", { class: "s-tiered-offer-tab-content-inner" }, h("div", { class: "s-tiered-offer-discount-section" }, h("p", { class: "s-tiered-offer-discount-title" }, this.discountText, " ", h("span", { innerHTML: activeTier.discount })), h("p", { class: "s-tiered-offer-benefit-description" }, this.benefitText, " ", activeTier.name)))));
        })())));
    }
    render() {
        if (this.isLoading) {
            return this.getLoadingSkeletonView();
        }
        if (!this.canRender || !this.tieredOfferData) {
            return null;
        }
        const currentTierData = this.getCurrentTierData();
        return (h(Host, null, h("div", { class: "s-tiered-offer-container" }, h("div", { class: "s-tiered-offer-header" }, h("div", { class: "s-tiered-offer-header-content" }, h("p", { class: "s-tiered-offer-program-title" }, this.loyaltyProgramText), h("div", { class: "s-tiered-offer-current-tier-name-wrapper" }, h("h2", { class: "s-tiered-offer-current-tier" }, this.currentTierText, " ", h("span", { class: "s-tiered-offer-tier-name" }, currentTierData.name)), h("span", { innerHTML: currentTierData.icon })))), this.renderProgressBar(), this.renderTabs())));
    }
    static get is() { return "salla-tiered-offer"; }
    static get originalStyleUrls() {
        return {
            "$": ["salla-tiered-offer.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["salla-tiered-offer.css"]
        };
    }
    static get states() {
        return {
            "tieredOfferData": {},
            "apiOfferData": {},
            "currentTierIndex": {},
            "currentTier": {},
            "activeTabTier": {},
            "canRender": {},
            "isLoading": {},
            "loyaltyProgramText": {},
            "currentTierText": {},
            "discountText": {},
            "benefitText": {}
        };
    }
}
