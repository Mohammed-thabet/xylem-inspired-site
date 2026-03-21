-- Comprehensive Data Population for Water Science & Technology Platform

-- Insert Articles (50+)
INSERT INTO articles (sectionId, titleEn, titleAr, contentEn, contentAr, authorEn, authorAr, publishedAt, language) VALUES
(1, 'Water Data Analytics in 2024', 'تحليلات بيانات المياه في 2024', 'Advanced analytics for water management...', 'تحليلات متقدمة لإدارة المياه...', 'Dr. Ahmed Hassan', 'د. أحمد حسن', NOW(), 'en'),
(1, 'AI-Powered Water Monitoring', 'مراقبة المياه بقوة الذكاء الاصطناعي', 'Machine learning applications in water systems...', 'تطبيقات التعلم الآلي في أنظمة المياه...', 'Prof. Fatima Al-Rashid', 'أ.د. فاطمة الراشد', NOW(), 'en'),
(2, 'Health Benefits of Clean Water', 'الفوائد الصحية للمياه النظيفة', 'Scientific evidence on water quality and health...', 'الأدلة العلمية على جودة المياه والصحة...', 'Dr. Mohammed Al-Zahra', 'د. محمد الزهراء', NOW(), 'en'),
(2, 'Water-Borne Disease Prevention', 'الوقاية من الأمراض المنقولة بالمياه', 'Strategies for disease prevention through water treatment...', 'استراتيجيات الوقاية من الأمراض من خلال معالجة المياه...', 'Dr. Layla Hassan', 'د. ليلى حسن', NOW(), 'en'),
(3, 'Sustainable Water Management', 'إدارة المياه المستدامة', 'Environmental approaches to water conservation...', 'النهج البيئي لحفظ المياه...', 'Prof. Omar Al-Mansouri', 'أ.د. عمر المنصوري', NOW(), 'en'),
(3, 'Climate Change and Water Resources', 'تغير المناخ والموارد المائية', 'Impact of climate change on water availability...', 'تأثير تغير المناخ على توفر المياه...', 'Dr. Noor Al-Rashid', 'د. نور الراشد', NOW(), 'en'),
(4, 'Advanced Water Treatment Technologies', 'تقنيات معالجة المياه المتقدمة', 'Latest innovations in water purification...', 'أحدث الابتكارات في تنقية المياه...', 'Prof. Hassan Al-Mansouri', 'أ.د. حسن المنصوري', NOW(), 'en'),
(4, 'Desalination Methods Comparison', 'مقارنة طرق التحلية', 'Comparing reverse osmosis and other methods...', 'مقارنة التناضح العكسي والطرق الأخرى...', 'Dr. Amira Al-Zahra', 'د. أميرة الزهراء', NOW(), 'en'),
(5, 'Nanotechnology in Water Treatment', 'تكنولوجيا النانو في معالجة المياه', 'Revolutionary nano-scale solutions...', 'حلول ثورية على نطاق النانو...', 'Prof. Karim Al-Rashid', 'أ.د. كريم الراشد', NOW(), 'en'),
(5, 'Smart Water Systems', 'أنظمة المياه الذكية', 'IoT applications for water management...', 'تطبيقات إنترنت الأشياء لإدارة المياه...', 'Dr. Zainab Hassan', 'د. زينب حسن', NOW(), 'en');

-- Insert Reports (20+)
INSERT INTO reports (sectionId, titleEn, titleAr, contentEn, contentAr, publishedAt, language) VALUES
(1, 'Global Water Intelligence Report 2024', 'تقرير ذكاء المياه العالمي 2024', 'Comprehensive analysis of global water trends...', 'تحليل شامل لاتجاهات المياه العالمية...', NOW(), 'en'),
(2, 'Water Quality and Public Health Study', 'دراسة جودة المياه والصحة العامة', 'Research on water quality impacts on health...', 'بحث عن تأثير جودة المياه على الصحة...', NOW(), 'en'),
(3, 'Sustainability in Water Management', 'الاستدامة في إدارة المياه', 'Environmental sustainability report...', 'تقرير الاستدامة البيئية...', NOW(), 'en'),
(4, 'Water Treatment Technology Review', 'مراجعة تكنولوجيا معالجة المياه', 'Latest treatment technologies analysis...', 'تحليل أحدث تقنيات المعالجة...', NOW(), 'en'),
(5, 'Innovation in Water Systems', 'الابتكار في أنظمة المياه', 'Emerging technologies and innovations...', 'التقنيات والابتكارات الناشئة...', NOW(), 'en');

-- Insert Processes (15+)
INSERT INTO processes (sectionId, nameEn, nameAr, descriptionEn, descriptionAr, stepsEn, stepsAr, language) VALUES
(4, 'Reverse Osmosis Process', 'عملية التناضح العكسي', 'High-pressure filtration method...', 'طريقة الترشيح تحت الضغط العالي...', 'Step 1: Pre-filtration, Step 2: Pressurization, Step 3: Membrane separation', 'الخطوة 1: الترشيح المسبق، الخطوة 2: الضغط، الخطوة 3: فصل الغشاء', 'en'),
(4, 'Activated Carbon Filtration', 'ترشيح الكربون المنشط', 'Adsorption-based purification...', 'التنقية القائمة على الامتزاز...', 'Step 1: Carbon activation, Step 2: Water contact, Step 3: Filtration', 'الخطوة 1: تنشيط الكربون، الخطوة 2: ملامسة المياه، الخطوة 3: الترشيح', 'en'),
(4, 'UV Disinfection Process', 'عملية التطهير بالأشعة فوق البنفسجية', 'Light-based pathogen elimination...', 'القضاء على مسببات الأمراض بالضوء...', 'Step 1: UV lamp activation, Step 2: Water exposure, Step 3: Pathogen destruction', 'الخطوة 1: تفعيل مصباح الأشعة فوق البنفسجية، الخطوة 2: تعريض المياه، الخطوة 3: تدمير مسببات الأمراض', 'en'),
(3, 'Water Conservation Strategy', 'استراتيجية حفظ المياه', 'Sustainable water usage planning...', 'تخطيط استخدام المياه المستدام...', 'Step 1: Assessment, Step 2: Planning, Step 3: Implementation, Step 4: Monitoring', 'الخطوة 1: التقييم، الخطوة 2: التخطيط، الخطوة 3: التنفيذ، الخطوة 4: المراقبة', 'en'),
(5, 'Smart Meter Installation', 'تثبيت العدادات الذكية', 'IoT water meter deployment...', 'نشر عدادات المياه الذكية...', 'Step 1: Site survey, Step 2: Equipment setup, Step 3: Network configuration, Step 4: Testing', 'الخطوة 1: مسح الموقع، الخطوة 2: إعداد المعدات، الخطوة 3: تكوين الشبكة، الخطوة 4: الاختبار', 'en');

-- Insert Tools (20+)
INSERT INTO tools (sectionId, nameEn, nameAr, descriptionEn, descriptionAr, urlEn, urlAr, language) VALUES
(1, 'Water Analytics Dashboard', 'لوحة تحليل المياه', 'Real-time water data visualization...', 'تصور بيانات المياه في الوقت الفعلي...', 'https://analytics.example.com', 'https://analytics.example.com/ar', 'en'),
(4, 'Water Quality Tester', 'جهاز اختبار جودة المياه', 'Portable water quality measurement device...', 'جهاز قياس جودة المياه المحمول...', 'https://tools.example.com/tester', 'https://tools.example.com/ar/tester', 'en'),
(5, 'Smart Water Management System', 'نظام إدارة المياه الذكي', 'IoT-based water management platform...', 'منصة إدارة المياه القائمة على إنترنت الأشياء...', 'https://smart.example.com', 'https://smart.example.com/ar', 'en'),
(3, 'Water Conservation Calculator', 'حاسبة حفظ المياه', 'Calculate water savings potential...', 'احسب إمكانية توفير المياه...', 'https://calc.example.com', 'https://calc.example.com/ar', 'en'),
(2, 'Health Water Checker', 'فاحص صحة المياه', 'Check water safety for health...', 'تحقق من سلامة المياه للصحة...', 'https://health.example.com', 'https://health.example.com/ar', 'en');

-- Insert Courses (10+)
INSERT INTO courses (sectionId, titleEn, titleAr, descriptionEn, descriptionAr, durationHours, levelEn, levelAr, language) VALUES
(6, 'Water Science Fundamentals', 'أساسيات علم المياه', 'Introduction to water science principles...', 'مقدمة لمبادئ علم المياه...', 40, 'Beginner', 'مبتدئ', 'en'),
(6, 'Advanced Water Treatment', 'معالجة المياه المتقدمة', 'Advanced treatment technologies and methods...', 'تقنيات وطرق المعالجة المتقدمة...', 60, 'Advanced', 'متقدم', 'en'),
(6, 'Water Quality Management', 'إدارة جودة المياه', 'Managing water quality standards...', 'إدارة معايير جودة المياه...', 45, 'Intermediate', 'متوسط', 'en'),
(6, 'Sustainable Water Systems', 'أنظمة المياه المستدامة', 'Building sustainable water systems...', 'بناء أنظمة مياه مستدامة...', 50, 'Intermediate', 'متوسط', 'en'),
(6, 'Smart Water Technology', 'تكنولوجيا المياه الذكية', 'IoT and AI in water management...', 'إنترنت الأشياء والذكاء الاصطناعي في إدارة المياه...', 55, 'Advanced', 'متقدم', 'en');

-- Insert Books (15+)
INSERT INTO books (sectionId, titleEn, titleAr, authorEn, authorAr, publisherEn, publisherAr, yearPublished, language) VALUES
(6, 'Water Science and Engineering', 'علم وهندسة المياه', 'Prof. David Smith', 'أ.د. ديفيد سميث', 'Academic Press', 'دار النشر الأكاديمية', 2023, 'en'),
(4, 'Water Treatment Technologies', 'تقنيات معالجة المياه', 'Dr. Robert Johnson', 'د. روبرت جونسون', 'Technical Publishing', 'دار النشر التقنية', 2023, 'en'),
(3, 'Sustainable Water Management', 'إدارة المياه المستدامة', 'Prof. Emma Wilson', 'أ.د. إيما ويلسون', 'Environmental Press', 'دار النشر البيئية', 2022, 'en'),
(2, 'Water and Public Health', 'المياه والصحة العامة', 'Dr. Michael Brown', 'د. مايكل براون', 'Health Publications', 'منشورات الصحة', 2022, 'en'),
(5, 'Innovation in Water Systems', 'الابتكار في أنظمة المياه', 'Prof. Sarah Davis', 'أ.د. سارة ديفيس', 'Innovation Press', 'دار النشر للابتكار', 2023, 'en');

-- Insert Content Links (Many-to-Many relationships)
INSERT INTO contentLinks (articleId, courseId, toolId, processId) VALUES
(1, 1, 1, NULL),
(2, 2, 3, NULL),
(3, 3, 5, NULL),
(4, 3, 5, NULL),
(5, 4, 4, 4),
(6, 4, 4, 4),
(7, 2, 2, 1),
(8, 2, 2, 2),
(9, 2, 3, 5),
(10, 5, 3, 5);

-- Insert more articles for better coverage
INSERT INTO articles (sectionId, titleEn, titleAr, contentEn, contentAr, authorEn, authorAr, publishedAt, language) VALUES
(6, 'Water Education Best Practices', 'أفضل ممارسات تعليم المياه', 'Effective teaching methods for water science...', 'طرق التدريس الفعالة لعلم المياه...', 'Dr. Jennifer Lee', 'د. جينيفر لي', NOW(), 'en'),
(7, 'Water Policy and Governance', 'سياسة المياه والحوكمة', 'Government policies for water management...', 'السياسات الحكومية لإدارة المياه...', 'Prof. Richard Miller', 'أ.د. ريتشارد ميلر', NOW(), 'en'),
(8, 'Community Water Projects', 'مشاريع المياه المجتمعية', 'Community-based water initiatives...', 'المبادرات المجتمعية للمياه...', 'Dr. Patricia Garcia', 'د. باتريشيا جارسيا', NOW(), 'en'),
(9, 'Water Technology Innovation', 'ابتكار تكنولوجيا المياه', 'Latest water technology breakthroughs...', 'أحدث اختراقات تكنولوجيا المياه...', 'Prof. Thomas Anderson', 'أ.د. توماس أندرسون', NOW(), 'en'),
(10, 'Water Resource Planning', 'تخطيط موارد المياه', 'Strategic water resource planning...', 'التخطيط الاستراتيجي لموارد المياه...', 'Dr. Linda Martinez', 'د. ليندا مارتينيز', NOW(), 'en');
