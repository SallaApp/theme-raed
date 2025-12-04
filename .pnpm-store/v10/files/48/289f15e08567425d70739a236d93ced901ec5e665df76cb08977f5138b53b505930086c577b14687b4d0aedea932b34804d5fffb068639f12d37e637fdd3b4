/*!
 * Crafted with ❤ by Salla
 */
export class TierUtils {
    /**
     * Find tier by index
     */
    static findTierByIndex(tiers, index) {
        return tiers.find(tier => tier.index === index) || null;
    }
    /**
     * Find tier by tier name
     */
    static findTierByName(tiers, tierName) {
        return tiers.find(tier => tier.tier_name === tierName) || null;
    }
    /**
     * Get tier name by index
     */
    static getTierNameByIndex(tiers, index) {
        return this.findTierByIndex(tiers, index)?.tier_name;
    }
    /**
     * Find current tier index based on current value
     */
    static findCurrentTierIndex(currentValue, tiers) {
        if (!tiers)
            return 0;
        for (let i = tiers.length - 1; i >= 0; i--) {
            if (currentValue >= tiers[i].threshold) {
                return tiers[i].index;
            }
        }
        return 0;
    }
}
