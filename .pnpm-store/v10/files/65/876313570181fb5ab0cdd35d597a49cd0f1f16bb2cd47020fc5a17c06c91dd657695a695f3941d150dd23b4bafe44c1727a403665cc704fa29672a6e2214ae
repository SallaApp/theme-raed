import { Product } from "@salla.sa/twilight/types/common";
export type Sources = "header" | "footer" | "json";
export interface MenuItem {
    id: number | string;
    order: number | null;
    title: string;
    url: string;
    products?: Product[];
    is_by_form_builder: boolean | null;
    attrs?: string;
    link_attrs?: string;
    target: HTMLAnchorElement['tagName'];
    has_children?: boolean;
    children: MenuItem[] | null;
    image: string | null;
}
