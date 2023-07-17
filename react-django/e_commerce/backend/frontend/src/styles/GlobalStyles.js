import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    h1 {
        font-size: 1.8rem;
        padding: 1rem 0;
    }

    h2 {
        font-size: 1.4rem;
        padding: 0.5rem 0;
    }

    h3 {
        padding: 1rem 0;
    }

    
    /* carousel */
    .carousel-item-next,
    .carousel-item-prev,
    .carousel-item.active {
        display: flex;
    }
    .carousel-caption {
        position: absolute;
        top: 0;
    }

    .carousel-caption h4 {
        color: #fff;
    }

    .carousel img {
        display:block;
        height: 300px;
        padding: 30px;
        margin: 40px;
        border-radius: 50%;
        margin-left: auto;
        margin-right: auto;
    }
    .carousel a {
        margin: 0 auto;
    }
    @media (max-width: 900px) {
        .carousel-caption h2 {
            font-size: 2.5vw;
        }
    }
`

export default GlobalStyles