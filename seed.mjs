import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] || 'localhost',
  user: process.env.DATABASE_URL?.split('://')[1]?.split(':')[0] || 'root',
  password: process.env.DATABASE_URL?.split(':')[2]?.split('@')[0] || '',
  database: process.env.DATABASE_URL?.split('/').pop() || 'test',
});

// Insert Product Categories
await connection.execute(`
  INSERT INTO productCategories (slug, nameEn, nameAr, descriptionEn, descriptionAr, \`order\`, isActive)
  VALUES 
    ('pumps', 'Pumps & Systems', 'أنظمة الضخ', 'Advanced pumping solutions for water management', 'حلول ضخ متقدمة لإدارة المياه', 1, true),
    ('filtration', 'Filtration Systems', 'أنظمة التصفية', 'High-efficiency water filtration technology', 'تكنولوجيا تصفية المياه عالية الكفاءة', 2, true),
    ('treatment', 'Treatment Systems', 'أنظمة المعالجة', 'Comprehensive water treatment solutions', 'حلول معالجة المياه الشاملة', 3, true),
    ('monitoring', 'Monitoring Systems', 'أنظمة المراقبة', 'Real-time water quality monitoring', 'مراقبة جودة المياه في الوقت الفعلي', 4, true),
    ('software', 'Software Solutions', 'حلول البرمجيات', 'Intelligent water management software', 'برمجيات إدارة المياه الذكية', 5, true)
  ON DUPLICATE KEY UPDATE nameEn=VALUES(nameEn)
`);

// Insert Brands
await connection.execute(`
  INSERT INTO brands (slug, nameEn, nameAr, descriptionEn, descriptionAr, \`order\`, isActive)
  VALUES 
    ('aqua-pro', 'AquaPro', 'أكوا برو', 'Leading water treatment brand', 'العلامة التجارية الرائدة في معالجة المياه', 1, true),
    ('hydro-tech', 'HydroTech', 'هايدروتك', 'Advanced hydraulic solutions', 'حلول هيدروليكية متقدمة', 2, true),
    ('pure-water', 'PureWater', 'ماء نقي', 'Premium water purification', 'تنقية المياه المتميزة', 3, true),
    ('eco-solutions', 'EcoSolutions', 'حلول بيئية', 'Sustainable water management', 'إدارة المياه المستدامة', 4, true),
    ('smart-aqua', 'SmartAqua', 'أكوا ذكية', 'IoT-enabled water systems', 'أنظمة المياه المدعومة بـ IoT', 5, true)
  ON DUPLICATE KEY UPDATE nameEn=VALUES(nameEn)
`);

// Insert Markets
await connection.execute(`
  INSERT INTO markets (slug, nameEn, nameAr, descriptionEn, descriptionAr, \`order\`, isActive)
  VALUES 
    ('agriculture', 'Agriculture & Irrigation', 'الزراعة والري', 'Efficient irrigation systems for modern farming', 'أنظمة الري الفعالة للزراعة الحديثة', 1, true),
    ('municipal', 'Municipal Water', 'المياه البلدية', 'Urban water supply and treatment', 'إمدادات المياه الحضرية ومعالجتها', 2, true),
    ('industrial', 'Industrial Applications', 'التطبيقات الصناعية', 'Process water solutions for industries', 'حلول مياه العمليات للصناعات', 3, true),
    ('environmental', 'Environmental Protection', 'حماية البيئة', 'Wastewater treatment and recycling', 'معالجة مياه الصرف وإعادة التدوير', 4, true),
    ('energy', 'Energy & Power', 'الطاقة والكهرباء', 'Water solutions for power generation', 'حلول المياه لتوليد الطاقة', 5, true)
  ON DUPLICATE KEY UPDATE nameEn=VALUES(nameEn)
`);

// Insert Products
await connection.execute(`
  INSERT INTO products (slug, nameEn, nameAr, descriptionEn, descriptionAr, categoryId, brandId, \`order\`, isActive)
  VALUES 
    ('centrifugal-pump-500', 'Centrifugal Pump 500 Series', 'مضخة الطرد المركزي 500', 'High-performance centrifugal pump for large-scale applications', 'مضخة طرد مركزي عالية الأداء للتطبيقات واسعة النطاق', 1, 1, 1, true),
    ('submersible-pump-pro', 'Submersible Pump Pro', 'المضخة الغاطسة برو', 'Efficient submersible pump for deep water extraction', 'مضخة غاطسة فعالة لاستخراج المياه العميقة', 1, 2, 2, true),
    ('sand-filter-advanced', 'Advanced Sand Filter', 'مرشح الرمل المتقدم', 'Multi-stage sand filtration system', 'نظام تصفية رمل متعدد المراحل', 2, 3, 3, true),
    ('uv-sterilizer-pro', 'UV Sterilizer Pro', 'معقم الأشعة فوق البنفسجية برو', 'UV-based water sterilization system', 'نظام تعقيم المياه بالأشعة فوق البنفسجية', 3, 4, 4, true),
    ('iot-monitor-smart', 'IoT Water Monitor', 'مراقب المياه الذكي', 'Real-time water quality monitoring with IoT', 'مراقبة جودة المياه في الوقت الفعلي مع IoT', 4, 5, 5, true),
    ('water-management-suite', 'Water Management Suite', 'مجموعة إدارة المياه', 'Comprehensive software for water system management', 'برمجيات شاملة لإدارة أنظمة المياه', 5, 1, 6, true)
  ON DUPLICATE KEY UPDATE nameEn=VALUES(nameEn)
`);

// Insert Blog Posts
await connection.execute(`
  INSERT INTO blogPosts (slug, titleEn, titleAr, excerptEn, excerptAr, contentEn, contentAr, category, isPublished, publishedAt, \`order\`)
  VALUES 
    ('future-water-technology', 'The Future of Water Technology', 'مستقبل تكنولوجيا المياه', 'Exploring cutting-edge innovations in water science and treatment', 'استكشاف الابتكارات الحديثة في علوم وتكنولوجيا المياه', 'Water technology is rapidly evolving with AI and IoT integration...', 'تتطور تكنولوجيا المياه بسرعة مع دمج الذكاء الاصطناعي وإنترنت الأشياء...', 'article', true, NOW(), 1),
    ('sustainable-water-management', 'Sustainable Water Management', 'إدارة المياه المستدامة', 'Best practices for sustainable water resource management', 'أفضل الممارسات لإدارة موارد المياه المستدامة', 'Sustainable water management is crucial for environmental protection...', 'إدارة المياه المستدامة حاسمة لحماية البيئة...', 'article', true, NOW(), 2),
    ('water-treatment-innovations', 'Water Treatment Innovations', 'ابتكارات معالجة المياه', 'Latest breakthroughs in water purification technology', 'أحدث الاختراقات في تكنولوجيا تنقية المياه', 'Recent innovations in water treatment include advanced filtration...', 'تشمل الابتكارات الحديثة في معالجة المياه التصفية المتقدمة...', 'article', true, NOW(), 3),
    ('iot-water-systems', 'IoT in Water Systems', 'إنترنت الأشياء في أنظمة المياه', 'How IoT is transforming water management', 'كيف يحول إنترنت الأشياء إدارة المياه', 'IoT technology enables real-time monitoring and optimization...', 'تتيح تكنولوجيا إنترنت الأشياء المراقبة والتحسين في الوقت الفعلي...', 'article', true, NOW(), 4),
    ('water-crisis-solutions', 'Solutions to Global Water Crisis', 'حلول الأزمة المائية العالمية', 'Addressing water scarcity through innovative solutions', 'معالجة نقص المياه من خلال حلول مبتكرة', 'The global water crisis requires innovative and sustainable solutions...', 'تتطلب الأزمة المائية العالمية حلولاً مبتكرة ومستدامة...', 'article', true, NOW(), 5)
  ON DUPLICATE KEY UPDATE titleEn=VALUES(titleEn)
`);

// Insert Statistics
await connection.execute(`
  INSERT INTO statistics (labelEn, labelAr, value, unit, \`order\`, isActive)
  VALUES 
    ('Global Water Users', 'مستخدمو المياه العالميون', '8', 'Billion', 1, true),
    ('Years of Experience', 'سنوات الخبرة', '50', 'Years', 2, true),
    ('Countries Served', 'الدول المخدومة', '120', 'Countries', 3, true),
    ('Water Treated Daily', 'المياه المعالجة يومياً', '500', 'Million Liters', 4, true),
    ('Innovation Patents', 'براءات الاختراع', '200', 'Patents', 5, true)
  ON DUPLICATE KEY UPDATE value=VALUES(value)
`);

// Insert Locations
await connection.execute(`
  INSERT INTO locations (nameEn, nameAr, country, city, address, phone, email, latitude, longitude, isActive)
  VALUES 
    ('Headquarters', 'المقر الرئيسي', 'United States', 'New York', '123 Water Street, New York, NY 10001', '+1-800-123-4567', 'hq@watersciencetech.com', 40.7128, -74.0060, true),
    ('Middle East Office', 'مكتب الشرق الأوسط', 'United Arab Emirates', 'Dubai', 'Dubai Marina, Dubai, UAE', '+971-4-XXX-XXXX', 'me@watersciencetech.com', 25.2048, 55.2708, true),
    ('Europe Office', 'مكتب أوروبا', 'Germany', 'Berlin', 'Berlin Tech Park, Berlin, Germany', '+49-30-XXX-XXXX', 'eu@watersciencetech.com', 52.5200, 13.4050, true),
    ('Asia Pacific', 'آسيا والمحيط الهادئ', 'Singapore', 'Singapore', 'Marina Bay, Singapore', '+65-XXXX-XXXX', 'apac@watersciencetech.com', 1.2802, 103.8480, true),
    ('Africa Office', 'مكتب أفريقيا', 'South Africa', 'Johannesburg', 'Johannesburg CBD, South Africa', '+27-11-XXX-XXXX', 'africa@watersciencetech.com', -26.2041, 28.0473, true)
  ON DUPLICATE KEY UPDATE nameEn=VALUES(nameEn)
`);

console.log('✅ Database seeded successfully with comprehensive sample data!');
await connection.end();
