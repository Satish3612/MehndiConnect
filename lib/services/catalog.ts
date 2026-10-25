export const serviceCategories = [
  "bridal",
  "engagement",
  "simple",
] as const;

export type ServiceCategory = (typeof serviceCategories)[number];

export type MehndiService = {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  priceInr: number;
  durationMinutes: number;
  packageName: string;
  imageAlt: string;
};

export const sampleServices: readonly MehndiService[] = [
  {
    id: "bridal-classic",
    name: "क्लासिक ब्राइडल मेहंदी",
    description: "हाथों और पैरों पर बारीक पारंपरिक डिज़ाइन।",
    category: "bridal",
    priceInr: 8500,
    durationMinutes: 300,
    packageName: "ब्राइडल क्लासिक पैकेज",
    imageAlt: "हाथों के लिए गोल फूलों वाले पारंपरिक मेहंदी डिज़ाइन का नमूना",
  },
  {
    id: "bridal-premium",
    name: "प्रीमियम ब्राइडल मेहंदी",
    description: "दोनों तरफ़ हाथों और पैरों के लिए विस्तृत डिज़ाइन।",
    category: "bridal",
    priceInr: 12000,
    durationMinutes: 420,
    packageName: "ब्राइडल प्रीमियम पैकेज",
    imageAlt: "बारीक जाली और फूलों वाले मेहंदी डिज़ाइन का नमूना",
  },
  {
    id: "engagement-elegant",
    name: "एलिगेंट एंगेजमेंट मेहंदी",
    description: "ख़ास दिन के लिए सुंदर और संतुलित डिज़ाइन।",
    category: "engagement",
    priceInr: 3500,
    durationMinutes: 150,
    packageName: "एंगेजमेंट एलिगेंट पैकेज",
    imageAlt: "फूलों और पत्तियों वाले एंगेजमेंट मेहंदी डिज़ाइन का नमूना",
  },
  {
    id: "engagement-signature",
    name: "सिग्नेचर एंगेजमेंट मेहंदी",
    description: "हाथों पर आगे और पीछे की ओर बारीक सजावट।",
    category: "engagement",
    priceInr: 5000,
    durationMinutes: 210,
    packageName: "एंगेजमेंट सिग्नेचर पैकेज",
    imageAlt: "नाज़ुक बेल और पत्ती के पैटर्न वाले मेहंदी डिज़ाइन का नमूना",
  },
  {
    id: "simple-classic",
    name: "सिंपल क्लासिक मेहंदी",
    description: "हल्के अवसरों के लिए साफ़-सुथरा मिनिमल डिज़ाइन।",
    category: "simple",
    priceInr: 800,
    durationMinutes: 45,
    packageName: "सिंपल क्लासिक पैकेज",
    imageAlt: "हथेली पर छोटा और सरल फूलों वाला मेहंदी डिज़ाइन नमूना",
  },
  {
    id: "simple-floral",
    name: "सिंपल फ्लोरल मेहंदी",
    description: "एक हाथ के लिए हल्का फूलों वाला डिज़ाइन।",
    category: "simple",
    priceInr: 1200,
    durationMinutes: 60,
    packageName: "सिंपल फ्लोरल पैकेज",
    imageAlt: "हाथ के एक हिस्से पर सरल फूलों वाला मेहंदी डिज़ाइन नमूना",
  },
];

export function getServicesByCategory(
  services: readonly MehndiService[],
  category: ServiceCategory,
): readonly MehndiService[] {
  return services.filter((service) => service.category === category);
}
