export type Product = {
  code?: string;
  name?: string;
  searchstring?: string;
  product_status?: string;
  haspromo?: number;
  general_description?: string;
  classname?: string;
  classname_full?: string;
  class_id?: number;
  price?: number;
  currency?: string;
  main_picture_url?: string;
  manufacturer?: string;
  category?: string;
  subcategory?: string;
  partnum?: string;
  gallery?: {
    picture?: {
      picture_url?: string;
      thumbnail_url?: string;
    };
  };
  vendor_url?: string;
  properties?: {
    property?: (
      | string
      | {
          "#text"?: string;
          "":
            | string[]
            | {
                "40"?: string[];
                "#text"?: string;
              };
        }
    )[];
  };
};
