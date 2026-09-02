<script>

</script>
<template>
    <footer class="footer">

        <div class="container">

            <!-- Main Footer -->
            <div class="row footer-top align-items-start ">

                <!-- Brand -->
                <div class="col-12 col-lg-6 ">

                    <RouterLink to="/" class="footer-logo">
                        <span class="logo-icon">
                            <i class="fa-solid fa-film"></i>
                        </span>

                        <span>
                            Cine<span class="logo-highlight">Verse</span>
                        </span>
                    </RouterLink>

                    <p class="footer-description">
                        A cinematic discovery space for people who love films —
                        browse, filter, and keep a watchlist of everything worth a
                        night in.
                    </p>
                </div>


                <!-- Browse -->
                <div class="col-12 col-lg-3">

                    <h5 class="footer-title">
                        Browse
                    </h5>

                    <ul class="list-unstyled footer-links">

                        <li>
                            <RouterLink to="/">
                                Home
                            </RouterLink>
                        </li>

                        <li>
                            <RouterLink to="/movies">
                                Movies
                            </RouterLink>
                        </li>

                        <li>
                            <RouterLink to="/favorites">
                                Favorites
                            </RouterLink>
                        </li>

                        <li>
                            <RouterLink to="/profile">
                                Profile
                            </RouterLink>
                        </li>

                    </ul>

                </div>

                <!-- icons -->
                <div class="col-12 col-lg-3">

                    <h5 class="footer-title">
                        Follow
                    </h5>

                    <div class="social-links d-flex gap-2">

                        <a href="#" class="social-icon" aria-label="Twitter">
                            <i class="fa-brands fa-twitter"></i>
                        </a>

                        <a href="#" class="social-icon" aria-label="Instagram">
                            <i class="fa-brands fa-instagram"></i>
                        </a>

                        <a href="#" class="social-icon" aria-label="YouTube">
                            <i class="fa-brands fa-youtube"></i>
                        </a>

                        <a href="#" class="social-icon" aria-label="GitHub">
                            <i class="fa-brands fa-github"></i>
                        </a>

                    </div>

                </div>

            </div>



            <!-- Divider -->
            <div class="footer-divider"></div>


            <!-- Copyright -->
            <div class="footer-bottom text-center">

                <p class="copyright mb-0">
                    © 2026 CineVerse. All rights reserved.
                </p>

            </div>

        </div>

    </footer>
</template>





<style scoped>
.footer {
    background: var(--primary-color);
    color:var(--white);
    border-top: 1px solid rgba(255, 255, 255, 0.07);
}


/*top Footer*/

.footer-top {
    padding: 60px 0px;

}


/* footer-logo */
.footer-logo {
    display: inline-flex;
    align-items: center;

    gap: 6px;

    color: #f5f5f7;

    text-decoration: none;

    font-size: 1.35rem;
    font-weight: 700;
}

.logo-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;


    background-image: linear-gradient(135deg,
             var(--secondary-color),
            var(--logo-secondary-color));

    color: var(--white);

    font-size: 18px;
}

.logo-highlight {
    background-image: linear-gradient(to right,
             var(--secondary-color),
            var(--logo-secondary-color));
    background-clip: text;
    color: transparent;
}


/* Description */

.footer-description {
    max-width: 470px;
    margin-top: 18px;
    color: #8d94a5;
    font-size: 0.95rem;
    line-height: 1.7;
}


/* Titles */

.footer-title {
    margin-bottom: 20px;
    color: #f4f4f5;
    font-size: 0.95rem;
    font-weight: 700;
}

/* footer-links */

.footer-links li {
    margin-bottom: 5px;
}

.footer-links a {
    color: #9ba2b2;
    text-decoration: none;
    font-size: 0.9rem;
    transition: 0.3s ease;
    display: inline-block;
}

.footer-links a:hover {
    color: var(--secondary-color);
    transform: translateY(-3px);

}


/* footer-icons*/

.social-icon {
    width: 48px;
    height: 48px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    background: #1b2130;
    color: #9ba2b2;
    text-decoration: none;
    font-size: 17px;
    transition: 0.3s ease;
}

.social-icon:hover {
    background: var(--secondary-color);
    color: var(--white);
    transform: translateY(-3px);
}


/* Divider*/

.footer-divider {
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.07);
}


/*Bottom*/

.footer-bottom {
    padding: 27px 0;
}

.copyright {
    color: #6f7686;
    font-size: 0.82rem;
}


/*Responsive */

@media (max-width: 991.98px) {

    .footer-top {
        padding: 40px 0;
    }

    .footer-description {
        max-width: 100%;
    }

    .footer-title {
        margin-top: 10px;
    }

    .social-icon {
        width: 42px;
        height: 42px;
    }

    .footer-bottom {
        padding: 22px 0;
    }

}
</style>