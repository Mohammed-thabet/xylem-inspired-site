import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

async function seedDatabase() {
  const connection = await mysql.createConnection(DATABASE_URL);

  try {
    console.log('🌱 Starting database seeding...\n');

    // Clear existing data (in reverse order of dependencies)
    console.log('Clearing existing data...');
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    await connection.query('DELETE FROM contentLinks');
    await connection.query('DELETE FROM courses');
    await connection.query('DELETE FROM tools');
    await connection.query('DELETE FROM books');
    await connection.query('DELETE FROM techniques');
    await connection.query('DELETE FROM processes');
    await connection.query('DELETE FROM reports');
    await connection.query('DELETE FROM articles');
    await connection.query('DELETE FROM sections');
    await connection.query('DELETE FROM locations');
    await connection.query('DELETE FROM statistics');
    await connection.query('DELETE FROM contactSubmissions');
    await connection.query('DELETE FROM blogPosts');
    await connection.query('DELETE FROM products');
    await connection.query('DELETE FROM productCategories');
    await connection.query('DELETE FROM brands');
    await connection.query('DELETE FROM markets');
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('✓ Data cleared\n');

    // 1. Insert Sections (12 sections)
    console.log('Inserting sections...');
    const sections = [
      { slug: 'intelligence', nameEn: 'Water Intelligence', nameAr: 'ذكاء المياه', descriptionEn: 'Data-driven insights and analytics for water management', descriptionAr: 'رؤى قائمة على البيانات وتحليلات إدارة المياه', order: 1 },
      { slug: 'science-health', nameEn: 'Science & Health', nameAr: 'العلوم والصحة', descriptionEn: 'Scientific research on water quality and health impacts', descriptionAr: 'البحث العلمي حول جودة المياه وتأثيراتها الصحية', order: 2 },
      { slug: 'sustainability', nameEn: 'Sustainability', nameAr: 'الاستدامة', descriptionEn: 'Environmental practices and sustainable water solutions', descriptionAr: 'الممارسات البيئية والحلول المستدامة للمياه', order: 3 },
      { slug: 'treatment', nameEn: 'Water Treatment', nameAr: 'معالجة المياه', descriptionEn: 'Advanced water treatment technologies and methods', descriptionAr: 'تقنيات ومعالجات المياه المتقدمة', order: 4 },
      { slug: 'innovation', nameEn: 'Innovation Lab', nameAr: 'مختبر الابتكار', descriptionEn: 'Cutting-edge research and development initiatives', descriptionAr: 'مبادرات البحث والتطوير المتقدمة', order: 5 },
      { slug: 'education', nameEn: 'Education', nameAr: 'التعليم', descriptionEn: 'Training programs and educational resources', descriptionAr: 'برامج التدريب والموارد التعليمية', order: 6 },
      { slug: 'policy', nameEn: 'Policy & Advocacy', nameAr: 'السياسة والدعوة', descriptionEn: 'Policy insights and advocacy for water management', descriptionAr: 'رؤى السياسة والدعوة لإدارة المياه', order: 7 },
      { slug: 'community', nameEn: 'Community', nameAr: 'المجتمع', descriptionEn: 'Community engagement and social impact programs', descriptionAr: 'برامج تفاعل المجتمع والتأثير الاجتماعي', order: 8 },
      { slug: 'technology', nameEn: 'Technology', nameAr: 'التكنولوجيا', descriptionEn: 'Digital solutions and IoT for water management', descriptionAr: 'الحلول الرقمية وإنترنت الأشياء لإدارة المياه', order: 9 },
      { slug: 'resources', nameEn: 'Resources', nameAr: 'الموارد', descriptionEn: 'Learning materials and reference documents', descriptionAr: 'مواد التعلم والمستندات المرجعية', order: 10 },
      { slug: 'partnerships', nameEn: 'Partnerships', nameAr: 'الشراكات', descriptionEn: 'Collaboration opportunities and partnerships', descriptionAr: 'فرص التعاون والشراكات', order: 11 },
      { slug: 'marketplace', nameEn: 'Marketplace', nameAr: 'السوق', descriptionEn: 'External marketplace for water solutions', descriptionAr: 'السوق الخارجية لحلول المياه', order: 12, isCommerceGateway: true },
    ];

    for (const section of sections) {
      await connection.query(
        'INSERT INTO sections (slug, nameEn, nameAr, descriptionEn, descriptionAr, `order`, isCommerceGateway, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, 1)',
        [section.slug, section.nameEn, section.nameAr, section.descriptionEn, section.descriptionAr, section.order, section.isCommerceGateway || false]
      );
    }
    console.log(`✓ Inserted ${sections.length} sections\n`);

    // 2. Insert Markets
    console.log('Inserting markets...');
    const markets = [
      { slug: 'agriculture', nameEn: 'Agriculture', nameAr: 'الزراعة', descriptionEn: 'Water solutions for agricultural applications', descriptionAr: 'حلول المياه للتطبيقات الزراعية', order: 1 },
      { slug: 'municipal', nameEn: 'Municipal', nameAr: 'البلديات', descriptionEn: 'Urban water management and distribution', descriptionAr: 'إدارة المياه الحضرية والتوزيع', order: 2 },
      { slug: 'industrial', nameEn: 'Industrial', nameAr: 'الصناعي', descriptionEn: 'Industrial water treatment solutions', descriptionAr: 'حلول معالجة المياه الصناعية', order: 3 },
      { slug: 'environmental', nameEn: 'Environmental', nameAr: 'البيئي', descriptionEn: 'Environmental protection and conservation', descriptionAr: 'حماية البيئة والحفاظ عليها', order: 4 },
      { slug: 'energy', nameEn: 'Energy', nameAr: 'الطاقة', descriptionEn: 'Water for energy production', descriptionAr: 'المياه لإنتاج الطاقة', order: 5 },
    ];

    for (const market of markets) {
      await connection.query(
        'INSERT INTO markets (slug, nameEn, nameAr, descriptionEn, descriptionAr, `order`, isActive) VALUES (?, ?, ?, ?, ?, ?, 1)',
        [market.slug, market.nameEn, market.nameAr, market.descriptionEn, market.descriptionAr, market.order]
      );
    }
    console.log(`✓ Inserted ${markets.length} markets\n`);

    // 3. Insert Product Categories
    console.log('Inserting product categories...');
    const categories = [
      { slug: 'pumps', nameEn: 'Pumps & Circulation', nameAr: 'المضخات والدوران', order: 1 },
      { slug: 'filtration', nameEn: 'Filtration Systems', nameAr: 'أنظمة الترشيح', order: 2 },
      { slug: 'treatment', nameEn: 'Treatment Technologies', nameAr: 'تقنيات المعالجة', order: 3 },
      { slug: 'monitoring', nameEn: 'Monitoring & Control', nameAr: 'المراقبة والتحكم', order: 4 },
      { slug: 'software', nameEn: 'Software Solutions', nameAr: 'حلول البرمجيات', order: 5 },
    ];

    for (const cat of categories) {
      await connection.query(
        'INSERT INTO productCategories (slug, nameEn, nameAr, `order`, isActive) VALUES (?, ?, ?, ?, 1)',
        [cat.slug, cat.nameEn, cat.nameAr, cat.order]
      );
    }
    console.log(`✓ Inserted ${categories.length} product categories\n`);

    // 4. Insert Brands
    console.log('Inserting brands...');
    const brands = [
      { slug: 'aquapro', nameEn: 'AquaPro', nameAr: 'أكوا برو', descriptionEn: 'Leading water treatment solutions', descriptionAr: 'حلول معالجة المياه الرائدة', order: 1 },
      { slug: 'hydrotech', nameEn: 'HydroTech', nameAr: 'هايدروتك', descriptionEn: 'Advanced water technologies', descriptionAr: 'تقنيات المياه المتقدمة', order: 2 },
      { slug: 'purewater', nameEn: 'PureWater', nameAr: 'بيور ووتر', descriptionEn: 'Pure water purification systems', descriptionAr: 'أنظمة تنقية المياه النقية', order: 3 },
      { slug: 'ecosolutions', nameEn: 'EcoSolutions', nameAr: 'إيكو سولوشنز', descriptionEn: 'Sustainable water solutions', descriptionAr: 'حلول المياه المستدامة', order: 4 },
      { slug: 'smartaqua', nameEn: 'SmartAqua', nameAr: 'سمارت أكوا', descriptionEn: 'Smart water management systems', descriptionAr: 'أنظمة إدارة المياه الذكية', order: 5 },
    ];

    for (const brand of brands) {
      await connection.query(
        'INSERT INTO brands (slug, nameEn, nameAr, descriptionEn, descriptionAr, `order`, isActive) VALUES (?, ?, ?, ?, ?, ?, 1)',
        [brand.slug, brand.nameEn, brand.nameAr, brand.descriptionEn, brand.descriptionAr, brand.order]
      );
    }
    console.log(`✓ Inserted ${brands.length} brands\n`);

    // 5. Insert Products
    console.log('Inserting products...');
    const products = [
      { slug: 'aquapro-pump-1000', nameEn: 'AquaPro Pump 1000', nameAr: 'مضخة أكوا برو 1000', descriptionEn: 'High-capacity water pump for agricultural use', descriptionAr: 'مضخة مياه عالية السعة للاستخدام الزراعي', categoryId: 1, brandId: 1, order: 1 },
      { slug: 'hydrotech-filter-pro', nameEn: 'HydroTech Filter Pro', nameAr: 'مرشح هايدروتك برو', descriptionEn: 'Advanced multi-stage filtration system', descriptionAr: 'نظام ترشيح متعدد المراحل متقدم', categoryId: 2, brandId: 2, order: 2 },
      { slug: 'purewater-uv-system', nameEn: 'PureWater UV System', nameAr: 'نظام بيور ووتر UV', descriptionEn: 'UV disinfection system for water treatment', descriptionAr: 'نظام تطهير UV لمعالجة المياه', categoryId: 3, brandId: 3, order: 3 },
      { slug: 'smartaqua-iot-monitor', nameEn: 'SmartAqua IoT Monitor', nameAr: 'مراقب سمارت أكوا IoT', descriptionEn: 'Real-time water quality monitoring device', descriptionAr: 'جهاز مراقبة جودة المياه في الوقت الفعلي', categoryId: 4, brandId: 5, order: 4 },
      { slug: 'ecosolutions-softener', nameEn: 'EcoSolutions Water Softener', nameAr: 'مرطب المياه إيكو سولوشنز', descriptionEn: 'Eco-friendly water softening system', descriptionAr: 'نظام تليين المياه الصديق للبيئة', categoryId: 3, brandId: 4, order: 5 },
      { slug: 'aquapro-controller', nameEn: 'AquaPro Smart Controller', nameAr: 'متحكم أكوا برو الذكي', descriptionEn: 'Intelligent water system controller', descriptionAr: 'متحكم نظام المياه الذكي', categoryId: 5, brandId: 1, order: 6 },
      { slug: 'hydrotech-ro-system', nameEn: 'HydroTech RO System', nameAr: 'نظام هايدروتك RO', descriptionEn: 'Reverse osmosis water purification system', descriptionAr: 'نظام تنقية المياه بالتناضح العكسي', categoryId: 3, brandId: 2, order: 7 },
      { slug: 'purewater-chlorinator', nameEn: 'PureWater Chlorinator', nameAr: 'معقم بيور ووتر', descriptionEn: 'Automatic chlorination system', descriptionAr: 'نظام الكلورة التلقائي', categoryId: 3, brandId: 3, order: 8 },
      { slug: 'smartaqua-dashboard', nameEn: 'SmartAqua Dashboard', nameAr: 'لوحة سمارت أكوا', descriptionEn: 'Cloud-based water management dashboard', descriptionAr: 'لوحة إدارة المياه المستندة إلى السحابة', categoryId: 5, brandId: 5, order: 9 },
      { slug: 'ecosolutions-recycler', nameEn: 'EcoSolutions Recycler', nameAr: 'معاد التدوير إيكو سولوشنز', descriptionEn: 'Water recycling and reuse system', descriptionAr: 'نظام إعادة تدوير واستخدام المياه', categoryId: 3, brandId: 4, order: 10 },
    ];

    for (const product of products) {
      await connection.query(
        'INSERT INTO products (slug, nameEn, nameAr, descriptionEn, descriptionAr, categoryId, brandId, `order`, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)',
        [product.slug, product.nameEn, product.nameAr, product.descriptionEn, product.descriptionAr, product.categoryId, product.brandId, product.order]
      );
    }
    console.log(`✓ Inserted ${products.length} products\n`);

    // 6. Insert Blog Posts
    console.log('Inserting blog posts...');
    const blogPosts = [
      { slug: 'water-quality-standards', titleEn: 'Water Quality Standards', titleAr: 'معايير جودة المياه', excerptEn: 'Understanding international water quality standards', excerptAr: 'فهم معايير جودة المياه الدولية', category: 'article', isPublished: true },
      { slug: 'desalination-technology', titleEn: 'Modern Desalination Technology', titleAr: 'تقنية تحلية المياه الحديثة', excerptEn: 'Latest advances in water desalination', excerptAr: 'أحدث التطورات في تحلية المياه', category: 'article', isPublished: true },
      { slug: 'wastewater-treatment', titleEn: 'Wastewater Treatment Methods', titleAr: 'طرق معالجة مياه الصرف', excerptEn: 'Comprehensive guide to wastewater treatment', excerptAr: 'دليل شامل لمعالجة مياه الصرف', category: 'article', isPublished: true },
      { slug: 'water-conservation', titleEn: 'Water Conservation Strategies', titleAr: 'استراتيجيات الحفاظ على المياه', excerptEn: 'Effective strategies for water conservation', excerptAr: 'استراتيجيات فعالة للحفاظ على المياه', category: 'article', isPublished: true },
      { slug: 'smart-water-systems', titleEn: 'Smart Water Management Systems', titleAr: 'أنظمة إدارة المياه الذكية', excerptEn: 'IoT solutions for water management', excerptAr: 'حلول إنترنت الأشياء لإدارة المياه', category: 'article', isPublished: true },
      { slug: 'groundwater-protection', titleEn: 'Groundwater Protection', titleAr: 'حماية المياه الجوفية', excerptEn: 'Protecting our groundwater resources', excerptAr: 'حماية موارد المياه الجوفية لدينا', category: 'article', isPublished: true },
      { slug: 'water-testing-guide', titleEn: 'Water Testing Guide', titleAr: 'دليل اختبار المياه', excerptEn: 'Complete guide to water quality testing', excerptAr: 'دليل شامل لاختبار جودة المياه', category: 'article', isPublished: true },
      { slug: 'industrial-water-reuse', titleEn: 'Industrial Water Reuse', titleAr: 'إعادة استخدام المياه الصناعية', excerptEn: 'Water reuse in industrial applications', excerptAr: 'إعادة استخدام المياه في التطبيقات الصناعية', category: 'article', isPublished: true },
    ];

    for (const post of blogPosts) {
      await connection.query(
        'INSERT INTO blogPosts (slug, titleEn, titleAr, excerptEn, excerptAr, category, isPublished, publishedAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
        [post.slug, post.titleEn, post.titleAr, post.excerptEn, post.excerptAr, post.category, post.isPublished]
      );
    }
    console.log(`✓ Inserted ${blogPosts.length} blog posts\n`);

    // 7. Insert Articles
    console.log('Inserting articles...');
    const articles = [
      { slug: 'water-cycle-basics', titleEn: 'Water Cycle Basics', titleAr: 'أساسيات دورة المياه', excerptEn: 'Understanding the water cycle', excerptAr: 'فهم دورة المياه', sectionId: 2, isPublished: true },
      { slug: 'ph-balance-importance', titleEn: 'pH Balance Importance', titleAr: 'أهمية توازن الحموضة', excerptEn: 'Why pH balance matters in water', excerptAr: 'لماذا يهم توازن الحموضة في المياه', sectionId: 2, isPublished: true },
      { slug: 'microbial-contamination', titleEn: 'Microbial Contamination', titleAr: 'التلوث الميكروبي', excerptEn: 'Understanding microbial water contamination', excerptAr: 'فهم التلوث الميكروبي للمياه', sectionId: 2, isPublished: true },
      { slug: 'water-hardness', titleEn: 'Water Hardness', titleAr: 'عسر المياه', excerptEn: 'What is water hardness and how to treat it', excerptAr: 'ما هو عسر المياه وكيفية معالجته', sectionId: 3, isPublished: true },
      { slug: 'sustainable-practices', titleEn: 'Sustainable Water Practices', titleAr: 'الممارسات المستدامة للمياه', excerptEn: 'Best practices for sustainable water use', excerptAr: 'أفضل الممارسات لاستخدام المياه المستدام', sectionId: 3, isPublished: true },
      { slug: 'treatment-processes', titleEn: 'Water Treatment Processes', titleAr: 'عمليات معالجة المياه', excerptEn: 'Overview of water treatment methods', excerptAr: 'نظرة عامة على طرق معالجة المياه', sectionId: 4, isPublished: true },
      { slug: 'filtration-methods', titleEn: 'Filtration Methods', titleAr: 'طرق الترشيح', excerptEn: 'Different water filtration techniques', excerptAr: 'تقنيات ترشيح المياه المختلفة', sectionId: 4, isPublished: true },
      { slug: 'disinfection-techniques', titleEn: 'Disinfection Techniques', titleAr: 'تقنيات التطهير', excerptEn: 'Methods for water disinfection', excerptAr: 'طرق تطهير المياه', sectionId: 4, isPublished: true },
    ];

    for (const article of articles) {
      await connection.query(
        'INSERT INTO articles (slug, titleEn, titleAr, excerptEn, excerptAr, sectionId, isPublished, publishedAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
        [article.slug, article.titleEn, article.titleAr, article.excerptEn, article.excerptAr, article.sectionId, article.isPublished]
      );
    }
    console.log(`✓ Inserted ${articles.length} articles\n`);

    // 8. Insert Reports
    console.log('Inserting reports...');
    const reports = [
      { slug: 'water-quality-report-2024', titleEn: 'Water Quality Report 2024', titleAr: 'تقرير جودة المياه 2024', descriptionEn: 'Annual water quality assessment', descriptionAr: 'تقييم جودة المياه السنوي', sectionId: 2, isPublished: true },
      { slug: 'sustainability-assessment', titleEn: 'Sustainability Assessment', titleAr: 'تقييم الاستدامة', descriptionEn: 'Water sustainability report', descriptionAr: 'تقرير استدامة المياه', sectionId: 3, isPublished: true },
      { slug: 'treatment-efficiency', titleEn: 'Treatment Efficiency Study', titleAr: 'دراسة كفاءة المعالجة', descriptionEn: 'Analysis of water treatment efficiency', descriptionAr: 'تحليل كفاءة معالجة المياه', sectionId: 4, isPublished: true },
      { slug: 'innovation-trends', titleEn: 'Innovation Trends Report', titleAr: 'تقرير اتجاهات الابتكار', descriptionEn: 'Latest trends in water technology', descriptionAr: 'أحدث الاتجاهات في تكنولوجيا المياه', sectionId: 5, isPublished: true },
      { slug: 'policy-analysis', titleEn: 'Policy Analysis Report', titleAr: 'تقرير تحليل السياسة', descriptionEn: 'Analysis of water management policies', descriptionAr: 'تحليل سياسات إدارة المياه', sectionId: 7, isPublished: true },
    ];

    for (const report of reports) {
      await connection.query(
        'INSERT INTO reports (slug, titleEn, titleAr, descriptionEn, descriptionAr, sectionId, isPublished, publishedAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
        [report.slug, report.titleEn, report.titleAr, report.descriptionEn, report.descriptionAr, report.sectionId, report.isPublished]
      );
    }
    console.log(`✓ Inserted ${reports.length} reports\n`);

    // 9. Insert Tools
    console.log('Inserting tools...');
    const tools = [
      { slug: 'water-quality-calculator', nameEn: 'Water Quality Calculator', nameAr: 'حاسبة جودة المياه', descriptionEn: 'Calculate water quality parameters', descriptionAr: 'حساب معاملات جودة المياه', sectionId: 1, toolType: 'calculator', isPublished: true },
      { slug: 'treatment-selector', nameEn: 'Treatment Selector', nameAr: 'محدد المعالجة', descriptionEn: 'Find the right treatment solution', descriptionAr: 'ابحث عن حل المعالجة المناسب', sectionId: 4, toolType: 'selector', isPublished: true },
      { slug: 'dosage-calculator', nameEn: 'Chemical Dosage Calculator', nameAr: 'حاسبة جرعة المواد الكيميائية', descriptionEn: 'Calculate chemical dosages for treatment', descriptionAr: 'حساب جرعات المواد الكيميائية للمعالجة', sectionId: 4, toolType: 'calculator', isPublished: true },
      { slug: 'flow-rate-converter', nameEn: 'Flow Rate Converter', nameAr: 'محول معدل التدفق', descriptionEn: 'Convert between flow rate units', descriptionAr: 'تحويل بين وحدات معدل التدفق', sectionId: 1, toolType: 'converter', isPublished: true },
      { slug: 'hardness-calculator', nameEn: 'Water Hardness Calculator', nameAr: 'حاسبة عسر المياه', descriptionEn: 'Calculate water hardness levels', descriptionAr: 'حساب مستويات عسر المياه', sectionId: 3, toolType: 'calculator', isPublished: true },
    ];

    for (const tool of tools) {
      await connection.query(
        'INSERT INTO tools (slug, nameEn, nameAr, descriptionEn, descriptionAr, sectionId, toolType, isPublished) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [tool.slug, tool.nameEn, tool.nameAr, tool.descriptionEn, tool.descriptionAr, tool.sectionId, tool.toolType, tool.isPublished]
      );
    }
    console.log(`✓ Inserted ${tools.length} tools\n`);

    // 10. Insert Courses
    console.log('Inserting courses...');
    const courses = [
      { slug: 'water-basics-101', titleEn: 'Water Basics 101', titleAr: 'أساسيات المياه 101', descriptionEn: 'Introduction to water science', descriptionAr: 'مقدمة في علم المياه', sectionId: 6, level: 'beginner', duration: '4 weeks', isPublished: true },
      { slug: 'treatment-advanced', titleEn: 'Advanced Water Treatment', titleAr: 'معالجة المياه المتقدمة', descriptionEn: 'Advanced treatment technologies', descriptionAr: 'تقنيات المعالجة المتقدمة', sectionId: 6, level: 'advanced', duration: '8 weeks', isPublished: true },
      { slug: 'quality-management', titleEn: 'Quality Management', titleAr: 'إدارة الجودة', descriptionEn: 'Water quality management systems', descriptionAr: 'أنظمة إدارة جودة المياه', sectionId: 6, level: 'intermediate', duration: '6 weeks', isPublished: true },
      { slug: 'iot-water-systems', titleEn: 'IoT Water Systems', titleAr: 'أنظمة المياه IoT', descriptionEn: 'Smart water management with IoT', descriptionAr: 'إدارة المياه الذكية مع IoT', sectionId: 6, level: 'advanced', duration: '6 weeks', isPublished: true },
      { slug: 'sustainability-course', titleEn: 'Sustainability Course', titleAr: 'دورة الاستدامة', descriptionEn: 'Sustainable water practices', descriptionAr: 'ممارسات المياه المستدامة', sectionId: 6, level: 'intermediate', duration: '5 weeks', isPublished: true },
    ];

    for (const course of courses) {
      await connection.query(
        'INSERT INTO courses (slug, titleEn, titleAr, descriptionEn, descriptionAr, sectionId, level, duration, isPublished) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [course.slug, course.titleEn, course.titleAr, course.descriptionEn, course.descriptionAr, course.sectionId, course.level, course.duration, course.isPublished]
      );
    }
    console.log(`✓ Inserted ${courses.length} courses\n`);

    // 11. Insert Statistics
    console.log('Inserting statistics...');
    const statistics = [
      { labelEn: 'Global Water Shortage', labelAr: 'نقص المياه العالمي', value: '2.2B', unit: 'people', order: 1 },
      { labelEn: 'Water Treatment Coverage', labelAr: 'تغطية معالجة المياه', value: '71%', unit: 'global', order: 2 },
      { labelEn: 'Industrial Water Use', labelAr: 'استخدام المياه الصناعي', value: '19%', unit: 'of total', order: 3 },
      { labelEn: 'Agricultural Water Use', labelAr: 'استخدام المياه الزراعي', value: '70%', unit: 'of total', order: 4 },
      { labelEn: 'Water Recycling Rate', labelAr: 'معدل إعادة تدوير المياه', value: '8.5%', unit: 'global', order: 5 },
      { labelEn: 'Groundwater Depletion', labelAr: 'استنزاف المياه الجوفية', value: '21.5B', unit: 'm³/year', order: 6 },
      { labelEn: 'Water Quality Standards', labelAr: 'معايير جودة المياه', value: '50+', unit: 'countries', order: 7 },
      { labelEn: 'Treatment Technologies', labelAr: 'تقنيات المعالجة', value: '100+', unit: 'available', order: 8 },
    ];

    for (const stat of statistics) {
      await connection.query(
        'INSERT INTO statistics (labelEn, labelAr, value, unit, `order`, isActive) VALUES (?, ?, ?, ?, ?, 1)',
        [stat.labelEn, stat.labelAr, stat.value, stat.unit, stat.order]
      );
    }
    console.log(`✓ Inserted ${statistics.length} statistics\n`);

    // 12. Insert Locations
    console.log('Inserting locations...');
    const locations = [
      { nameEn: 'Global Headquarters', nameAr: 'المقر الرئيسي العالمي', country: 'Netherlands', city: 'Amsterdam', address: '123 Water Street', phone: '+31 20 123 4567', email: 'contact@watersci.com' },
      { nameEn: 'Middle East Office', nameAr: 'مكتب الشرق الأوسط', country: 'United Arab Emirates', city: 'Dubai', address: '456 Innovation Avenue', phone: '+971 4 123 4567', email: 'me@watersci.com' },
      { nameEn: 'Asia-Pacific Center', nameAr: 'مركز آسيا والمحيط الهادئ', country: 'Singapore', city: 'Singapore', address: '789 Tech Park', phone: '+65 6123 4567', email: 'apac@watersci.com' },
      { nameEn: 'Americas Office', nameAr: 'مكتب الأمريكتين', country: 'United States', city: 'New York', address: '321 Water Plaza', phone: '+1 212 123 4567', email: 'americas@watersci.com' },
      { nameEn: 'Africa Operations', nameAr: 'عمليات أفريقيا', country: 'South Africa', city: 'Cape Town', address: '654 Development Road', phone: '+27 21 123 4567', email: 'africa@watersci.com' },
      { nameEn: 'Europe Center', nameAr: 'مركز أوروبا', country: 'Germany', city: 'Berlin', address: '987 Research Street', phone: '+49 30 123 4567', email: 'europe@watersci.com' },
      { nameEn: 'Latin America Hub', nameAr: 'مركز أمريكا اللاتينية', country: 'Brazil', city: 'São Paulo', address: '111 Sustainability Way', phone: '+55 11 123 4567', email: 'latam@watersci.com' },
      { nameEn: 'India Regional Office', nameAr: 'مكتب الهند الإقليمي', country: 'India', city: 'New Delhi', address: '222 Innovation Drive', phone: '+91 11 123 4567', email: 'india@watersci.com' },
      { nameEn: 'Australia Office', nameAr: 'مكتب أستراليا', country: 'Australia', city: 'Sydney', address: '333 Pacific Boulevard', phone: '+61 2 123 4567', email: 'australia@watersci.com' },
      { nameEn: 'Canada Operations', nameAr: 'عمليات كندا', country: 'Canada', city: 'Toronto', address: '444 North Street', phone: '+1 416 123 4567', email: 'canada@watersci.com' },
    ];

    for (const location of locations) {
      await connection.query(
        'INSERT INTO locations (nameEn, nameAr, country, city, address, phone, email, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, 1)',
        [location.nameEn, location.nameAr, location.country, location.city, location.address, location.phone, location.email]
      );
    }
    console.log(`✓ Inserted ${locations.length} locations\n`);

    // 13. Insert Processes
    console.log('Inserting processes...');
    const processes = [
      { slug: 'coagulation-process', nameEn: 'Coagulation Process', nameAr: 'عملية التخثر', descriptionEn: 'Water coagulation treatment process', descriptionAr: 'عملية معالجة تخثر المياه', sectionId: 4, isPublished: true },
      { slug: 'sedimentation-process', nameEn: 'Sedimentation Process', nameAr: 'عملية الترسيب', descriptionEn: 'Water sedimentation and settling', descriptionAr: 'ترسيب وتسوية المياه', sectionId: 4, isPublished: true },
      { slug: 'filtration-process', nameEn: 'Filtration Process', nameAr: 'عملية الترشيح', descriptionEn: 'Water filtration techniques', descriptionAr: 'تقنيات ترشيح المياه', sectionId: 4, isPublished: true },
      { slug: 'disinfection-process', nameEn: 'Disinfection Process', nameAr: 'عملية التطهير', descriptionEn: 'Water disinfection methods', descriptionAr: 'طرق تطهير المياه', sectionId: 4, isPublished: true },
      { slug: 'reverse-osmosis', nameEn: 'Reverse Osmosis', nameAr: 'التناضح العكسي', descriptionEn: 'RO water purification process', descriptionAr: 'عملية تنقية المياه بالتناضح العكسي', sectionId: 4, isPublished: true },
    ];

    for (const process of processes) {
      await connection.query(
        'INSERT INTO processes (slug, nameEn, nameAr, descriptionEn, descriptionAr, sectionId, isPublished) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [process.slug, process.nameEn, process.nameAr, process.descriptionEn, process.descriptionAr, process.sectionId, process.isPublished]
      );
    }
    console.log(`✓ Inserted ${processes.length} processes\n`);

    // 14. Insert Techniques
    console.log('Inserting techniques...');
    const techniques = [
      { slug: 'uv-disinfection', nameEn: 'UV Disinfection', nameAr: 'التطهير بالأشعة فوق البنفسجية', descriptionEn: 'UV light disinfection technique', descriptionAr: 'تقنية التطهير بالأشعة فوق البنفسجية', sectionId: 4, isPublished: true },
      { slug: 'ozone-treatment', nameEn: 'Ozone Treatment', nameAr: 'معالجة الأوزون', descriptionEn: 'Ozone-based water treatment', descriptionAr: 'معالجة المياه بالأوزون', sectionId: 4, isPublished: true },
      { slug: 'chlorination', nameEn: 'Chlorination', nameAr: 'الكلورة', descriptionEn: 'Chlorine-based disinfection', descriptionAr: 'التطهير بالكلور', sectionId: 4, isPublished: true },
      { slug: 'activated-carbon', nameEn: 'Activated Carbon', nameAr: 'الكربون المنشط', descriptionEn: 'Activated carbon filtration', descriptionAr: 'ترشيح الكربون المنشط', sectionId: 4, isPublished: true },
      { slug: 'ion-exchange', nameEn: 'Ion Exchange', nameAr: 'تبادل الأيونات', descriptionEn: 'Ion exchange treatment method', descriptionAr: 'طريقة معالجة تبادل الأيونات', sectionId: 4, isPublished: true },
    ];

    for (const technique of techniques) {
      await connection.query(
        'INSERT INTO techniques (slug, nameEn, nameAr, descriptionEn, descriptionAr, sectionId, isPublished) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [technique.slug, technique.nameEn, technique.nameAr, technique.descriptionEn, technique.descriptionAr, technique.sectionId, technique.isPublished]
      );
    }
    console.log(`✓ Inserted ${techniques.length} techniques\n`);

    // 15. Insert Books
    console.log('Inserting books...');
    const books = [
      { slug: 'water-science-fundamentals', titleEn: 'Water Science Fundamentals', titleAr: 'أساسيات علم المياه', descriptionEn: 'Comprehensive guide to water science', descriptionAr: 'دليل شامل لعلم المياه', authorEn: 'Dr. John Smith', authorAr: 'د. جون سميث', publisherEn: 'Water Press', publisherAr: 'دار نشر المياه', publishedYear: 2023, sectionId: 2, isPublished: true },
      { slug: 'treatment-technologies', titleEn: 'Water Treatment Technologies', titleAr: 'تقنيات معالجة المياه', descriptionEn: 'Advanced treatment methods', descriptionAr: 'طرق المعالجة المتقدمة', authorEn: 'Prof. Sarah Johnson', authorAr: 'أ.د. سارة جونسون', publisherEn: 'Tech Publishing', publisherAr: 'دار النشر التقنية', publishedYear: 2024, sectionId: 4, isPublished: true },
      { slug: 'sustainable-water', titleEn: 'Sustainable Water Management', titleAr: 'إدارة المياه المستدامة', descriptionEn: 'Sustainability in water systems', descriptionAr: 'الاستدامة في أنظمة المياه', authorEn: 'Dr. Michael Green', authorAr: 'د. مايكل جرين', publisherEn: 'Green Publishing', publisherAr: 'دار النشر الخضراء', publishedYear: 2023, sectionId: 3, isPublished: true },
      { slug: 'iot-water-systems', titleEn: 'IoT in Water Systems', titleAr: 'إنترنت الأشياء في أنظمة المياه', descriptionEn: 'Smart water management guide', descriptionAr: 'دليل إدارة المياه الذكية', authorEn: 'Dr. Lisa Chen', authorAr: 'د. ليزا تشن', publisherEn: 'Tech Press', publisherAr: 'دار نشر التكنولوجيا', publishedYear: 2024, sectionId: 9, isPublished: true },
      { slug: 'water-policy', titleEn: 'Water Policy & Governance', titleAr: 'سياسة وحوكمة المياه', descriptionEn: 'Water policy frameworks', descriptionAr: 'أطر سياسات المياه', authorEn: 'Prof. Robert Williams', authorAr: 'أ.د. روبرت ويليامز', publisherEn: 'Policy Press', publisherAr: 'دار نشر السياسة', publishedYear: 2023, sectionId: 7, isPublished: true },
    ];

    for (const book of books) {
      await connection.query(
        'INSERT INTO books (slug, titleEn, titleAr, descriptionEn, descriptionAr, authorEn, authorAr, publisherEn, publisherAr, publishedYear, sectionId, isPublished) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [book.slug, book.titleEn, book.titleAr, book.descriptionEn, book.descriptionAr, book.authorEn, book.authorAr, book.publisherEn, book.publisherAr, book.publishedYear, book.sectionId, book.isPublished]
      );
    }
    console.log(`✓ Inserted ${books.length} books\n`);

    console.log('✅ Database seeding completed successfully!\n');
    console.log('Summary:');
    console.log(`  - ${sections.length} sections`);
    console.log(`  - ${markets.length} markets`);
    console.log(`  - ${categories.length} product categories`);
    console.log(`  - ${brands.length} brands`);
    console.log(`  - ${products.length} products`);
    console.log(`  - ${blogPosts.length} blog posts`);
    console.log(`  - ${articles.length} articles`);
    console.log(`  - ${reports.length} reports`);
    console.log(`  - ${tools.length} tools`);
    console.log(`  - ${courses.length} courses`);
    console.log(`  - ${statistics.length} statistics`);
    console.log(`  - ${locations.length} locations`);
    console.log(`  - ${processes.length} processes`);
    console.log(`  - ${techniques.length} techniques`);
    console.log(`  - ${books.length} books\n`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

seedDatabase();
