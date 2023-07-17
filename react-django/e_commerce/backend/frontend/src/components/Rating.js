import styled from "styled-components"

const Rating = ({rating, numReviews, color}) => {
    return (
        <RatingDiv>

            {/* first star */}
            <span>
                <i className={
                        rating >= 1 
                        ? "fa-solid fa-star" 
                        : rating >= 0.5 
                            ? "fa-solid fa-star-half-stroke"
                            : "fa-regular fa-star"
                    } style={{color}} />
            </span>

            {/* second star */}
            <span>
                <i className={
                        rating >= 2 
                        ? "fa-solid fa-star" 
                        : rating >= 1.5 
                            ? "fa-solid fa-star-half-stroke"
                            : "fa-regular fa-star"
                    } style={{color}} />
            </span>

            {/* third star */}
            <span>
                <i className={
                        rating >= 3 
                        ? "fa-solid fa-star" 
                        : rating >= 2.5 
                            ? "fa-solid fa-star-half-stroke"
                            : "fa-regular fa-star"
                    } style={{color}} />
            </span>

            {/* fourth star */}
            <span>
                <i className={
                        rating >= 4 
                        ? "fa-solid fa-star" 
                        : rating >= 3.5 
                            ? "fa-solid fa-star-half-stroke"
                            : "fa-regular fa-star"
                    } style={{color}} />
            </span>

            {/* fifth star */}
            <span>
                <i className={
                        rating >= 5 
                        ? "fa-solid fa-star" 
                        : rating >= 4.5 
                            ? "fa-solid fa-star-half-stroke"
                            : "fa-regular fa-star"
                    } style={{color}} />
            </span>

            <span>{numReviews && "reviews"}</span>
        </RatingDiv>
    )
}

const RatingDiv = styled.div`
    margin: 0.1rem;
`

export default Rating