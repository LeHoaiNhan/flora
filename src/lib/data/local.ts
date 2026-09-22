export type ProductFaq = { question: string; answer: string };

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number | null;
  compare_at_price: number | null;
  currency: string;
  sku: string | null;
  stock_status: "instock" | "outofstock" | "onbackorder";
  image_url: string | null;
  status: "draft" | "published" | "archived";
  category_slugs?: string[];
  /** Additional photos shown alongside image_url in the detail-page gallery. */
  gallery?: string[];
  /** Short benefit bullets shown near the CTA. */
  highlights?: string[];
  origin?: string;
  manufacturer?: string;
  packaging?: string;
  licenseNo?: string;
  storageNote?: string;
  /** Numbered application steps, e.g. "Bón phân gà" → "Cày xới đất". */
  usageSteps?: { title: string; detail: string }[];
  faqs?: ProductFaq[];
  /** Bullet facts shown in the "supply capability" tab (packing, container, lead time...). */
  capabilityDetails?: string[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

export const LOCAL_CATEGORIES: Category[] = [
  {
    id: "11111111-1111-1111-1111-111111111101",
    name: "Sản phẩm hữu cơ",
    slug: "san-pham-huu-co",
    description: "Nông sản và sản phẩm hữu cơ",
  },
  {
    id: "11111111-1111-1111-1111-111111111102",
    name: "Nguyên liệu nhập khẩu hữu cơ",
    slug: "nguyen-lieu-nhap-khau-huu-co",
    description: "Nguyên liệu hữu cơ nhập khẩu",
  },
];

export const LOCAL_PRODUCTS: Product[] = [
  {
    id: "22222222-2222-2222-2222-222222222201",
    name: "Phân gà hữu cơ Nhật Bản",
    slug: "phan-ga-huu-co-nhat-ban",
    description:
      "Phân bón hữu cơ Flora Global OM1 — phân gà Nhật Bản đã qua lên men, nhập khẩu nguyên bao từ nhà sản xuất HOPE CO., LTD (Gifu, Nhật Bản). Trước khi xuống giống hoặc trồng cây, nên bón phân gà song song với cày xới đất để bổ sung cho đất đầy đủ dưỡng chất. Phù hợp bón lót và bón thúc cho cây ăn trái (cây có múi, nho, sầu riêng, chuối, dứa, dưa hấu, đu đủ, việt quất...) và rau màu. Đóng bao 15kg, cung ứng sỉ theo pallet/container cho trang trại, hợp tác xã và đại lý vật tư nông nghiệp.",
    short_description:
      "Phân gà hữu cơ lên men, nhập khẩu nguyên bao từ Nhật Bản — bón lót, bón thúc cho cây ăn trái và rau màu.",
    price: 250000,
    compare_at_price: null,
    currency: "VND",
    sku: "FG-OM1-15",
    stock_status: "instock",
    image_url: "/images/products/phan-ga.jpg",
    status: "published",
    category_slugs: ["nguyen-lieu-nhap-khau-huu-co"],
    gallery: [
      "/images/products/phan-ga.jpg",
      "/images/products/phan-ga-loi-ich.jpg",
      "/images/products/phan-ga-kho-hang.jpg",
      "/images/products/phan-ga-doi-tac.jpg",
      "/images/products/phan-ga-xuat-container.jpg",
    ],
    highlights: [
      "Bổ sung hữu cơ, dưỡng chất cho đất",
      "Cải thiện độ tơi xốp, giữ ẩm tốt hơn",
      "Tăng hoạt động của vi sinh vật có lợi",
      "Hỗ trợ cây bén rễ nhanh, phát triển khỏe",
    ],
    origin: "Nhập khẩu từ Nhật Bản (Gifu)",
    manufacturer: "HOPE CO., LTD — 1-9-13 Yasui, Ogaki-city, Gifu 503-0837, Nhật Bản",
    packaging: "Bao 15kg, đóng pallet — xuất bán theo container",
    licenseNo: "617/QĐ-TTTTV-PB ngày 23/07/2025 (Cục Trồng trọt và Bảo vệ thực vật)",
    storageNote: "Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp; nên sử dụng sớm sau khi mở bao.",
    usageSteps: [
      {
        title: "Bón phân gà",
        detail:
          "Rải đều phân gà lên mặt luống hoặc quanh gốc trước khi xuống giống, bổ sung hữu cơ và dưỡng chất nền cho đất.",
      },
      {
        title: "Cày xới đất",
        detail:
          "Cày xới để trộn đều phân gà vào đất, giúp đất tơi xốp, giữ ẩm tốt hơn và tạo điều kiện cho vi sinh vật có lợi hoạt động.",
      },
    ],
    capabilityDetails: [
      "Đóng bao 15kg, xếp pallet quấn màng chống ẩm trong suốt quá trình vận chuyển",
      "Xuất hàng theo container 20FT/40FT theo số lượng đặt hàng của trang trại, hợp tác xã, đại lý vật tư nông nghiệp",
      "Hàng có sẵn tại kho, sẵn sàng đóng và xuất nhanh cho đơn số lượng lớn",
      "Đội ngũ Flora Global đồng hành trực tiếp từ khâu đóng hàng đến khi giao tại kho khách hàng",
    ],
    faqs: [
      {
        question: "Phân bón hữu cơ Flora Global OM1 dùng cho loại cây nào?",
        answer:
          "Phù hợp bón lót và bón thúc cho cây ăn trái (cây có múi, nho, sầu riêng, chuối, dứa, dưa hấu, đu đủ, việt quất...) và rau màu, đặc biệt trước khi xuống giống hoặc trồng mới.",
      },
      {
        question: "Sản phẩm có giấy phép lưu hành tại Việt Nam không?",
        answer:
          "Có. Sản phẩm được cấp quyết định công nhận lưu hành số 617/QĐ-TTTTV-PB ngày 23/07/2025 của Cục Trồng trọt và Bảo vệ thực vật.",
      },
      {
        question: "Flora Global có bán lẻ theo bao không?",
        answer:
          "Flora Global chỉ cung ứng sỉ theo pallet/container cho trang trại, hợp tác xã và đại lý vật tư nông nghiệp. Liên hệ để nhận báo giá và quy cách đóng hàng phù hợp với đơn hàng của bạn.",
      },
      {
        question: "Thời gian giao hàng cho một container là bao lâu?",
        answer:
          "Thời gian nhập khẩu và giao hàng phụ thuộc số lượng và điểm giao nhận. Đội ngũ Flora Global sẽ tư vấn lịch nhập hàng cụ thể ngay khi nhận yêu cầu báo giá.",
      },
    ],
  },
  {
    id: "22222222-2222-2222-2222-222222222202",
    name: "Phân bón hữu cơ từ tro phân gà nung",
    slug: "phan-bon-huu-co-tu-tro-phan-ga-nung",
    description:
      "Phân bón hỗn hợp PK hữu cơ từ tro phân gà nung — giải pháp bền vững cho nông nghiệp hữu cơ.",
    short_description: "Phân bón hỗn hợp PK hữu cơ từ tro phân gà nung.",
    price: 125000,
    compare_at_price: null,
    currency: "VND",
    sku: null,
    stock_status: "instock",
    image_url: "/images/products/phan-bon.jpg",
    status: "published",
    category_slugs: ["nguyen-lieu-nhap-khau-huu-co"],
  },
  {
    id: "22222222-2222-2222-2222-222222222203",
    name: "Bột Protein từ cá",
    slug: "bot-protein-tu-ca",
    description:
      "Bột protein từ cá — nguyên liệu hữu cơ chất lượng cao cho dinh dưỡng và sản xuất.",
    short_description: "Bột protein từ cá — nguyên liệu hữu cơ chất lượng cao.",
    price: 125000,
    compare_at_price: null,
    currency: "VND",
    sku: null,
    stock_status: "instock",
    image_url: "/images/products/bot-protein.jpg",
    status: "published",
    category_slugs: ["san-pham-huu-co"],
  },
  {
    id: "22222222-2222-2222-2222-222222222204",
    name: "Bột hạt sen 100% nguyên chất",
    slug: "bot-hat-sen-100-nguyen-chat",
    description:
      "Bột hạt sen 100% nguyên chất. Liên hệ để được tư vấn và báo giá.",
    short_description: "Bột hạt sen nguyên chất — liên hệ để báo giá.",
    price: null,
    compare_at_price: null,
    currency: "VND",
    sku: null,
    stock_status: "instock",
    image_url: "/images/products/bot-hat-sen.jpg",
    status: "published",
    category_slugs: ["san-pham-huu-co"],
  },
];
