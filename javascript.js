document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const blogContainer = document.getElementById('blog-post-container');
    const blogContent = document.querySelector('.blog-single-content');
    
    // Función para el desplazamiento suave
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Menú hamburguesa
    if (hamburger && navbar) {
        // Abrir/cerrar menú
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navbar.classList.toggle('active');
            
            // Bloquear scroll del cuerpo cuando el menú está abierto
            if (navbar.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                // Manejar desplazamiento para enlaces internos
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    smoothScroll(href);
                }
            });
        });
        
        // Cerrar menú al hacer clic fuera de él
        document.addEventListener('click', function(e) {
            if (navbar.classList.contains('active') && 
                !navbar.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Prevenir que clics dentro del menú lo cierren
        navbar.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Actualizar enlace activo al desplazarse
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100; // Considerando altura del header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Manejo de formularios
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            this.reset();
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Gracias por suscribirte! Pronto recibirás nuestras novedades.');
            this.reset();
        });
    }
    
    // ==================================================
    // SISTEMA DE BLOG INDIVIDUAL
    // ==================================================
    
    // Base de datos de posts (personaliza con tus contenidos)
    const blogPosts = {
        'tendencias-otono': {
            title: 'Tendencias 2025',
            date: '15 Abril, 2025',
            image: 'https://images.unsplash.com/photo-1591369822091-0cc3c0d0ab71red',
            content: `<p>Esta temporada trae consigo una paleta de colores rica y cálida que refleja los tonos del follaje otoñal. Los esmaltes en tonos terracota, óxido, mostaza y vino tinto dominan las tendencias, creando una sensación acogedora y sofisticada.</p>
            
            <h2>Los colores estrella</h2>
            <p>Los expertos en moda predicen que los siguientes tonos serán imprescindibles:</p>
            <ul>
                <li><strong>Rojo Marsala</strong> - Un clásico reinventado</li>
                <li><strong>Verde Oliva</strong> - Para un look terroso y natural</li>
                <li><strong>Azul Petróleo</strong> - Un contraste sorprendente</li>
                <li><strong>Dorado Antiguo</strong> - Para un toque de lujo</li>
            </ul>
            
            <h2>Técnicas destacadas</h2>
            <p>Además de los colores, las técnicas que marcarán la diferencia incluyen:</p>
            <p>El efecto "stained glass" o vidriera está ganando popularidad, creando diseños translúcidos que juegan con la luz. También veremos mucho el "negative space" donde partes de la uña natural quedan al descubierto, creando diseños modernos y minimalistas.</p>
            
            <p>Para finalizar, los acabados mate continúan su reinado, especialmente en combinación con detalles brillantes que crean un contraste impactante. Los adornos minimalistas como pequeñas perlas o láminas doradas añaden ese toque especial sin recargar el diseño.</p>`,
            comments: [
                {name: "María López", text: "¡Me encantan los tonos terracota! Definitivamente probaré esta tendencia en mi próxima cita.", date: "17 Abril, 2025"},
                {name: "Carlos Rodríguez", text: "Excelente artículo, muy completa la información sobre las nuevas técnicas.", date: "16 Abril, 2025"}
            ]
        },
        'consejos-unas-fuertes': {
            title: '5 Consejos para Uñas más Fuertes',
            date: '2 Mayo, 2025',
            image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371',
            content: `<p>¿Sueñas con tener uñas fuertes y saludables? Sigue estos consejos profesionales que transformarán tus uñas en poco tiempo.</p>
            
            <h2>1. Hidratación constante</h2>
            <p>La hidratación es fundamental para unas uñas saludables. Aplica crema de manos y cutículas al menos dos veces al día, especialmente después de lavarte las manos. Los aceites naturales como el de argán, jojoba o almendras son excelentes para nutrir en profundidad.</p>
            
            <h2>2. Protección adecuada</h2>
            <p>Cuando realices tareas domésticas, especialmente aquellas que involucren agua o productos químicos, usa guantes de goma. La exposición prolongada al agua debilita las uñas, haciéndolas más propensas a romperse.</p>
            
            <h2>3. Alimentación balanceada</h2>
            <p>Incorpora a tu dieta alimentos ricos en:</p>
            <ul>
                <li><strong>Biotina</strong>: huevos, nueces y pescado</li>
                <li><strong>Vitamina E</strong>: espinacas, aguacate y brócoli</li>
                <li><strong>Zinc</strong>: semillas de calabaza, legumbres</li>
                <li><strong>Proteínas</strong>: esenciales para la queratina</li>
            </ul>
            
            <h2>4. Limado correcto</h2>
            <p>Siempre lima tus uñas en una sola dirección, nunca en vaivén. Usa una lima de cartón de grano fino y dale forma ovalada o cuadrada con esquinas redondeadas, que son menos propensas a romperse.</p>
            
            <h2>5. Tratamientos profesionales</h2>
            <p>Considera aplicar una base fortalecedora con ingredientes como el calcio y la seda. En Misstu Nails ofrecemos tratamientos de refuerzo con keratina que fortalecen las uñas desde la raíz.</p>`,
            comments: [
                {name: "Ana Martínez", text: "El consejo de la alimentación me ha cambiado la vida. ¡Mis uñas están mucho más fuertes!", date: "5 Mayo, 2025"}
            ]
        },
        'tecnicas-nail-art': {
            title: 'Técnicas Innovadoras de Nail Art',
            date: '25 Junio, 2025',
            image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa',
            content: `<p>El mundo del nail art está en constante evolución, y este año hemos visto surgir técnicas revolucionarias que permiten crear diseños antes impensables. Estas son las técnicas más innovadoras que están marcando tendencia:</p>
            
            <h2>1. Chroming Effect</h2>
            <p>Esta técnica crea un efecto espejo metálico usando polvos cromados especiales. El resultado es una superficie reflectante que parece metal líquido. Se aplica sobre base negra para mayor intensidad.</p>
            
            <h2>2. Velvet Nails</h2>
            <p>Usando polvos aterciopelados especiales, esta técnica crea una superficie suave y texturizada que simita terciopelo. Es perfecta para looks invernales y da una sensación única al tacto.</p>
            
            <h2>3. Water Transfer Printing</h2>
            <p>Originalmente usado en la industria automotriz, esta técnica permite transferir patrones complejos a las uñas mediante películas hidrosolubles. Los resultados son diseños fotográficos con detalles increíbles.</p>
            
            <h2>4. 3D Gel Embossing</h2>
            <p>Usando geles de construcción y moldes especiales, se crean relieves tridimensionales que parecen pequeñas esculturas en las uñas. Flores, figuras geométricas y elementos arquitectónicos cobran vida.</p>`,
            comments: []
        }
    };
    
    // Función para mostrar un post
    function showPost(postId) {
        if (blogPosts[postId]) {
            // Cerrar menú si está abierto
            if (navbar && navbar.classList.contains('active')) {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            
            const post = blogPosts[postId];
            
            // Construir HTML del post
            blogContent.innerHTML = `
                <button id="back-to-blog" class="back-btn">
                    <i class="fas fa-arrow-left"></i> Volver al Blog
                </button>
                
                <article class="single-post">
                    <div class="single-image">
                        <img src="${post.image}" alt="${post.title}">
                    </div>
                    
                    <div class="single-content">
                        <h1>${post.title}</h1>
                        
                        <div class="post-meta">
                            <span><i class="far fa-calendar"></i> ${post.date}</span>
                            <span><i class="far fa-comment"></i> ${post.comments.length} Comentarios</span>
                        </div>
                        
                        <div class="post-content">
                            ${post.content}
                        </div>
                        
                        <div class="comments-section">
                            <h3>Deja tu comentario</h3>
                            <form class="comment-form">
                                <div class="form-group">
                                    <input type="text" name="name" placeholder="Nombre" required>
                                </div>
                                
                                <div class="form-group">
                                    <input type="email" name="email" placeholder="Email" required>
                                </div>
                                
                                <div class="form-group">
                                    <textarea name="comment" placeholder="Tu comentario" rows="4" required></textarea>
                                </div>
                                
                                <button type="submit" class="btn">Enviar Comentario</button>
                            </form>
                            
                            <div class="comments-list">
                                ${renderCommentsHTML(post.comments)}
                            </div>
                        </div>
                    </div>
                </article>
            `;
            
            // Mostrar el contenedor
            blogContainer.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Bloquear scroll del fondo
            
            // Scroll al inicio
            window.scrollTo(0, 0);
            
            // Agregar evento al botón de volver
            document.getElementById('back-to-blog').addEventListener('click', function() {
                hidePost();
                history.back();
            });
            
            // Agregar evento al formulario de comentarios
            document.querySelector('.comment-form')?.addEventListener('submit', function(e) {
                e.preventDefault();
                handleCommentSubmit(postId, this);
            });
            
            // Actualizar URL
            history.pushState({postId: postId}, '', `#blog/${postId}`);
        }
    }
    
    // Función para ocultar el post
    function hidePost() {
        blogContainer.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }
    
    // Función para renderizar comentarios en HTML
    function renderCommentsHTML(comments) {
        if (comments.length === 0) return '<p class="no-comments">Sé el primero en comentar</p>';
        
        return comments.map(comment => `
            <div class="comment">
                <div class="comment-avatar">${comment.name.charAt(0).toUpperCase()}</div>
                <div class="comment-content">
                    <div class="comment-header">
                        <span class="comment-author">${comment.name}</span>
                        <span class="comment-date">${comment.date}</span>
                    </div>
                    <div class="comment-text">${comment.text}</div>
                </div>
            </div>
        `).join('');
    }
    
    // Función para manejar comentarios
    function handleCommentSubmit(postId, form) {
        const name = form.elements['name'].value;
        const commentText = form.elements['comment'].value;
        
        if (name && commentText) {
            // Crear nuevo comentario
            const newComment = {
                name: name,
                text: commentText,
                date: new Date().toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            };
            
            blogPosts[postId].comments.push(newComment);
            
            // Actualizar comentarios
            const commentsList = document.querySelector('.comments-list');
            commentsList.innerHTML = renderCommentsHTML(blogPosts[postId].comments);
            
            // Actualizar contador
            document.querySelector('.post-meta span:nth-child(2)').innerHTML = 
                `<i class="far fa-comment"></i> ${blogPosts[postId].comments.length} Comentarios`;
            
            // Resetear formulario
            form.reset();
            
            // Mostrar mensaje de éxito
            alert('¡Gracias por tu comentario! Se ha publicado correctamente.');
        }
    }
    
    // Manejar clic en "Leer más"
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const postId = this.getAttribute('data-post');
            showPost(postId);
        });
    });
    
    // Manejar el botón de retroceso del navegador
    window.addEventListener('popstate', function(event) {
        if (location.hash.startsWith('#blog/')) {
            const postId = location.hash.split('/')[1];
            showPost(postId);
        } else {
            hidePost();
        }
    });
    
    // Cargar post directamente si la URL lo indica
    if (window.location.hash.startsWith('#blog/')) {
        const postId = location.hash.split('/')[1];
        showPost(postId);
    }
    
    // Cerrar al hacer clic fuera del contenido
    blogContainer.addEventListener('click', function(e) {
        if (e.target === blogContainer) {
            hidePost();
            history.back();
        }
    });
});