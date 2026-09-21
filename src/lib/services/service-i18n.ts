import type { Locale } from "@/lib/i18n/config";

/**
 * UI strings for the redesigned service pages. Kept here (mirroring the pattern
 * in localized-content.ts) rather than spread across six dictionary files.
 */

export type ServiceStrings = {
  divisionFlora: string;
  divisionVoac: string;
  divisionPortfolio: string;
  divisionFloraNote: string;
  divisionVoacNote: string;
  divisionPortfolioNote: string;
  navGroupFlora: string;
  navGroupVoac: string;
  navGroupPortfolio: string;
  clusterPrecisionFarming: string;
  clusterCertification: string;
  clusterSourcing: string;
  clusterExport: string;
  clusterEcosystem: string;
  clusterPrecisionFarmingNote: string;
  clusterCertificationNote: string;
  clusterSourcingNote: string;
  clusterExportNote: string;
  clusterEcosystemNote: string;
  intro: string;
  network: string;
  explore: string;
  viewAll: string;
  overview: string;
  atAGlance: string;
  service: string;
};

const STRINGS: Record<Locale, ServiceStrings> = {
  en: {
    divisionFlora: "Flora Global — Integrated Ecosystem",
    divisionVoac: "VOAC — Consortium Services",
    divisionPortfolio: "VOAC — Programmes & Standards",
    divisionFloraNote:
      "Five vertically integrated capabilities, from Japanese-standard soil inputs to export logistics and global certification.",
    divisionVoacNote:
      "What you can engage VOAC to do for you — consulting, certification, support and product sourcing.",
    divisionPortfolioNote:
      "VOAC's own certification standards, model farms and partner network — the assets behind the consortium.",
    navGroupFlora: "Flora Global",
    navGroupVoac: "VOAC Services",
    navGroupPortfolio: "VOAC Programmes",
    clusterPrecisionFarming: "Precision Farming",
    clusterCertification: "Certification & Compliance",
    clusterSourcing: "Strategic Sourcing",
    clusterExport: "Export & Supply Chain",
    clusterEcosystem: "VOAC Ecosystem",
    clusterPrecisionFarmingNote:
      "From Japanese-standard inputs to data-driven cultivation — the quality foundation behind every Flora product.",
    clusterCertificationNote:
      "Managing global certification and compliance end-to-end, from farm to export.",
    clusterSourcingNote:
      "Connecting Vietnamese agricultural supply with international buyer demand.",
    clusterExportNote:
      "Running the export logistics chain — preserving quality from harvest to global market.",
    clusterEcosystemNote:
      "How VOAC runs the farm network and consortium services behind the Flora ecosystem.",
    intro:
      "One integrated ecosystem, delivered as distinct disciplines. Each service below is a self-contained capability — explore the one that matches your ambition.",
    network: "Organic crops in our network",
    explore: "Explore the ecosystem",
    viewAll: "View all services",
    overview: "Overview",
    atAGlance: "At a glance",
    service: "Service",
  },
  vi: {
    divisionFlora: "Flora Global — Hệ sinh thái tích hợp",
    divisionVoac: "VOAC — Dịch vụ liên minh",
    divisionPortfolio: "VOAC — Chương trình & Bộ chuẩn",
    divisionFloraNote:
      "Năm năng lực tích hợp theo chiều dọc — từ nguyên liệu đất chuẩn Nhật đến logistics xuất khẩu và chứng nhận toàn cầu.",
    divisionVoacNote:
      "Những gì bạn có thể thuê VOAC thực hiện — tư vấn, chứng nhận, hỗ trợ và tìm nguồn sản phẩm.",
    divisionPortfolioNote:
      "Bộ chuẩn chứng nhận, mô hình nông trại và mạng lưới đối tác do chính VOAC xây dựng — nền tảng đứng sau liên minh.",
    navGroupFlora: "Flora Global",
    navGroupVoac: "Dịch vụ VOAC",
    navGroupPortfolio: "Chương trình VOAC",
    clusterPrecisionFarming: "Canh tác chính xác",
    clusterCertification: "Chứng nhận & Tiêu chuẩn",
    clusterSourcing: "Tìm nguồn & Thu mua",
    clusterExport: "Xuất khẩu & Chuỗi cung ứng",
    clusterEcosystem: "Hệ sinh thái VOAC",
    clusterPrecisionFarmingNote:
      "Từ đầu vào chuẩn Nhật đến canh tác dữ liệu hoá — nền tảng chất lượng của mọi sản phẩm Flora.",
    clusterCertificationNote:
      "Quản lý tiêu chuẩn và chứng nhận quốc tế xuyên suốt từ trang trại đến xuất khẩu.",
    clusterSourcingNote:
      "Kết nối nguồn cung nông sản Việt Nam với nhu cầu của người mua quốc tế.",
    clusterExportNote:
      "Vận hành chuỗi logistics xuất khẩu — bảo toàn chất lượng từ thu hoạch đến thị trường toàn cầu.",
    clusterEcosystemNote:
      "Cách VOAC vận hành mạng lưới trang trại và dịch vụ liên minh phía sau hệ sinh thái Flora.",
    intro:
      "Một hệ sinh thái tích hợp, được triển khai thành những chuyên môn riêng biệt. Mỗi dịch vụ dưới đây là một năng lực độc lập — hãy khám phá dịch vụ phù hợp với mục tiêu của bạn.",
    network: "Cây trồng hữu cơ trong mạng lưới của chúng tôi",
    explore: "Khám phá hệ sinh thái",
    viewAll: "Xem tất cả dịch vụ",
    overview: "Tổng quan",
    atAGlance: "Thông tin nổi bật",
    service: "Dịch vụ",
  },
  zh: {
    divisionFlora: "Flora Global — 一体化生态系统",
    divisionVoac: "VOAC — 联盟服务",
    divisionPortfolio: "VOAC — 计划与标准",
    divisionFloraNote: "五项垂直整合能力，从日本标准的土壤投入到出口物流与全球认证。",
    divisionVoacNote:
      "您可以委托 VOAC 提供的服务——咨询、认证、支持与产品采购。",
    divisionPortfolioNote:
      "VOAC 自有的认证标准、示范农场与合作伙伴网络——支撑联盟的核心资产。",
    navGroupFlora: "Flora Global",
    navGroupVoac: "VOAC 服务",
    navGroupPortfolio: "VOAC 计划",
    clusterPrecisionFarming: "精准农业",
    clusterCertification: "认证与合规",
    clusterSourcing: "战略采购",
    clusterExport: "出口与供应链",
    clusterEcosystem: "VOAC 生态系统",
    clusterPrecisionFarmingNote: "从日本标准投入品到数据驱动的精准种植——Flora 每一款产品的品质基础。",
    clusterCertificationNote: "从农场到出口，全程管理全球认证与合规。",
    clusterSourcingNote: "连接越南农业供应与国际买家需求。",
    clusterExportNote: "运营出口物流链——从采收到全球市场，全程保持品质。",
    clusterEcosystemNote: "VOAC 如何运营 Flora 生态系统背后的农场网络与联盟服务。",
    intro:
      "一个一体化的生态系统，以各自独立的专业能力交付。以下每项服务都是一项独立能力——请探索最契合您目标的那一项。",
    network: "我们网络中的有机作物",
    explore: "探索生态系统",
    viewAll: "查看所有服务",
    overview: "概述",
    atAGlance: "概览",
    service: "服务",
  },
  ko: {
    divisionFlora: "Flora Global — 통합 생태계",
    divisionVoac: "VOAC — 컨소시엄 서비스",
    divisionPortfolio: "VOAC — 프로그램 및 표준",
    divisionFloraNote:
      "일본 기준의 토양 투입재부터 수출 물류, 글로벌 인증까지 수직 통합된 다섯 가지 역량.",
    divisionVoacNote:
      "VOAC에 의뢰할 수 있는 업무 — 컨설팅, 인증, 지원 및 제품 소싱.",
    divisionPortfolioNote:
      "VOAC가 직접 구축한 인증 표준, 모델 농장, 파트너 네트워크 — 컨소시엄을 뒷받침하는 자산.",
    navGroupFlora: "Flora Global",
    navGroupVoac: "VOAC 서비스",
    navGroupPortfolio: "VOAC 프로그램",
    clusterPrecisionFarming: "정밀 농업",
    clusterCertification: "인증 및 컴플라이언스",
    clusterSourcing: "전략적 소싱",
    clusterExport: "수출 및 공급망",
    clusterEcosystem: "VOAC 생태계",
    clusterPrecisionFarmingNote:
      "일본 기준 투입재부터 데이터 기반 재배까지 — 모든 Flora 제품의 품질 기반입니다.",
    clusterCertificationNote: "농장부터 수출까지, 글로벌 인증과 컴플라이언스를 전 과정 관리합니다.",
    clusterSourcingNote: "베트남 농산물 공급과 국제 바이어 수요를 연결합니다.",
    clusterExportNote: "수출 물류 체인을 운영하여 수확부터 글로벌 시장까지 품질을 지킵니다.",
    clusterEcosystemNote: "Flora 생태계를 뒷받침하는 농장 네트워크와 컨소시엄 서비스를 VOAC가 운영하는 방식입니다.",
    intro:
      "하나의 통합 생태계를 각각의 전문 분야로 제공합니다. 아래 각 서비스는 독립적인 역량입니다 — 목표에 맞는 서비스를 살펴보세요.",
    network: "네트워크 내 유기농 작물",
    explore: "생태계 살펴보기",
    viewAll: "모든 서비스 보기",
    overview: "개요",
    atAGlance: "한눈에 보기",
    service: "서비스",
  },
  hi: {
    divisionFlora: "Flora Global — एकीकृत पारिस्थितिकी तंत्र",
    divisionVoac: "VOAC — संघ सेवाएँ",
    divisionPortfolio: "VOAC — कार्यक्रम एवं मानक",
    divisionFloraNote:
      "जापानी-मानक मृदा इनपुट से लेकर निर्यात लॉजिस्टिक्स और वैश्विक प्रमाणन तक, पाँच ऊर्ध्वाधर एकीकृत क्षमताएँ।",
    divisionVoacNote:
      "जो काम आप VOAC को सौंप सकते हैं — परामर्श, प्रमाणन, सहायता और उत्पाद सोर्सिंग।",
    divisionPortfolioNote:
      "VOAC के अपने प्रमाणन मानक, आदर्श फार्म और साझेदार नेटवर्क — संघ के पीछे की संपत्तियाँ।",
    navGroupFlora: "Flora Global",
    navGroupVoac: "VOAC सेवाएँ",
    navGroupPortfolio: "VOAC कार्यक्रम",
    clusterPrecisionFarming: "सटीक खेती",
    clusterCertification: "प्रमाणन एवं अनुपालन",
    clusterSourcing: "रणनीतिक सोर्सिंग",
    clusterExport: "निर्यात एवं आपूर्ति श्रृंखला",
    clusterEcosystem: "VOAC पारिस्थितिकी तंत्र",
    clusterPrecisionFarmingNote:
      "जापानी-मानक इनपुट से लेकर डेटा-आधारित खेती तक — हर Flora उत्पाद की गुणवत्ता की नींव।",
    clusterCertificationNote:
      "फार्म से लेकर निर्यात तक, वैश्विक प्रमाणन एवं अनुपालन का संपूर्ण प्रबंधन।",
    clusterSourcingNote: "वियतनामी कृषि आपूर्ति को अंतरराष्ट्रीय खरीदारों की मांग से जोड़ना।",
    clusterExportNote:
      "निर्यात लॉजिस्टिक्स श्रृंखला का संचालन — फसल कटाई से वैश्विक बाज़ार तक गुणवत्ता बनाए रखना।",
    clusterEcosystemNote:
      "Flora पारिस्थितिकी तंत्र के पीछे फार्म नेटवर्क और संघ सेवाओं को VOAC किस तरह संचालित करता है।",
    intro:
      "एक एकीकृत पारिस्थितिकी तंत्र, अलग-अलग विषयों के रूप में प्रस्तुत। नीचे दी गई प्रत्येक सेवा एक स्वतंत्र क्षमता है — वह चुनें जो आपके लक्ष्य से मेल खाती हो।",
    network: "हमारे नेटवर्क में जैविक फसलें",
    explore: "पारिस्थितिकी तंत्र देखें",
    viewAll: "सभी सेवाएँ देखें",
    overview: "अवलोकन",
    atAGlance: "एक नज़र में",
    service: "सेवा",
  },
  si: {
    divisionFlora: "Flora Global — ඒකාබද්ධ පරිසර පද්ධතිය",
    divisionVoac: "VOAC — සම්මේලන සේවා",
    divisionPortfolio: "VOAC — වැඩසටහන් සහ ප්‍රමිති",
    divisionFloraNote:
      "ජපන් ප්‍රමිතියේ පස් යෙදවුම් සිට අපනයන සැපයුම් හා ගෝලීය සහතික දක්වා, සිරස් ලෙස ඒකාබද්ධ හැකියාවන් පහක්.",
    divisionVoacNote:
      "ඔබට VOAC හට පැවරිය හැකි කටයුතු — උපදේශන, සහතික, සහාය සහ නිෂ්පාදන සම්පත් සෙවීම.",
    divisionPortfolioNote:
      "VOAC විසින්ම ගොඩනඟන ලද සහතික ප්‍රමිති, ආදර්ශ ගොවිපළ සහ හවුල්කරු ජාලය — සම්මේලනය පිටුපස ඇති සම්පත්.",
    navGroupFlora: "Flora Global",
    navGroupVoac: "VOAC සේවා",
    navGroupPortfolio: "VOAC වැඩසටහන්",
    clusterPrecisionFarming: "නිරවද්‍ය ගොවිතැන",
    clusterCertification: "සහතික කිරීම සහ අනුකූලතාව",
    clusterSourcing: "උපායමාර්ගික සම්පත් සෙවීම",
    clusterExport: "අපනයනය සහ සැපයුම් දාමය",
    clusterEcosystem: "VOAC පරිසර පද්ධතිය",
    clusterPrecisionFarmingNote:
      "ජපන් ප්‍රමිතියේ යෙදවුම් සිට දත්ත මත පදනම් වූ වගාව දක්වා — සෑම Flora නිෂ්පාදනයක්ම පිටුපස ඇති ගුණාත්මක පදනම.",
    clusterCertificationNote:
      "ගොවිපළේ සිට අපනයනය දක්වා, ගෝලීය සහතික කිරීම සහ අනුකූලතාව සම්පූර්ණයෙන් කළමනාකරණය කිරීම.",
    clusterSourcingNote: "වියට්නාම කෘෂිකාර්මික සැපයුම ජාත්‍යන්තර ගැනුම්කරුවන්ගේ ඉල්ලුම සමඟ සම්බන්ධ කිරීම.",
    clusterExportNote:
      "අපනයන සැපයුම් දාමය ක්‍රියාත්මක කිරීම — අස්වැන්නේ සිට ගෝලීය වෙළඳපොළ දක්වා ගුණාත්මකභාවය රැක ගැනීම.",
    clusterEcosystemNote:
      "Flora පරිසර පද්ධතිය පිටුපස ඇති ගොවිපළ ජාලය සහ සම්මේලන සේවා VOAC ක්‍රියාත්මක කරන ආකාරය.",
    intro:
      "එක් ඒකාබද්ධ පරිසර පද්ධතියක්, වෙන් වෙන් විෂයයන් ලෙස ලබා දේ. පහත සෑම සේවාවක්ම ස්වාධීන හැකියාවකි — ඔබේ අරමුණට ගැලපෙන එක සොයා බලන්න.",
    network: "අපගේ ජාලයේ කාබනික බෝග",
    explore: "පරිසර පද්ධතිය ගවේෂණය කරන්න",
    viewAll: "සියලු සේවා බලන්න",
    overview: "දළ විශ්ලේෂණය",
    atAGlance: "සැකෙවින්",
    service: "සේවාව",
  },
};

export function getServiceStrings(locale: Locale): ServiceStrings {
  return STRINGS[locale] ?? STRINGS.en;
}
