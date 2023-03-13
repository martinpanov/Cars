import styles from './Details.module.css'

export default function Details() {
    // let slideIndex = 1;
    // showSlides(slideIndex);

    // // Next/previous controls
    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // // Thumbnail image controls
    // function currentSlide(n) {
    //     showSlides(slideIndex = n);
    // }

    // function showSlides(n) {
    //     let i;
    //     let slides = document.getElementsByClassName("mySlides");
    //     let dots = document.getElementsByClassName("dot");
    //     if (n > slides.length) { slideIndex = 1; }
    //     if (n < 1) { slideIndex = slides.length; }
    //     for (i = 0; i < slides.length; i++) {
    //         slides[i].style.display = "none";
    //     }
    //     for (i = 0; i < dots.length; i++) {
    //         dots[i].className = dots[i].className.replace(" active", "");
    //     }
    //     slides[slideIndex - 1].style.display = "block";
    //     dots[slideIndex - 1].className += " active";
    // }

    return (

        <section id={styles["details-page"]}>
            {/* {{car.manufacturer}} {{car.model}} */}
            <h1>BMW</h1>

            {/* <div className={styles["slideshow-container"]}> */}

                {/* <!-- Full-width images with number and caption text --> */}
                {/* <div className={styles["mySlides fade"]}>
                    <div className={styles["numbertext"]}>1 / 3</div>
                    <img src="/static/images/{{car.images}}" style="width:100%" />
                </div> */}

                {/* <div className={styles["mySlides fade"]}>
                    <div className={styles["numbertext"]}>2 / 3</div>
                    <img src="/static/images/{{car.images}}" style="width:100%" />
                </div> */}

                {/* <div className={styles["mySlides fade"]}>
                    <div className={styles["numbertext"]}>3 / 3</div>
                    <img src="/static/images/{{car.images}}" style="width:100%" />
                </div> */}

                {/* <!-- Next and previous buttons --> */}
                {/* <a className={styles["prev"]} onClick={plusSlides(-1)}>&#10094;</a>
                <a className={styles["next"]} onClick={plusSlides(1)}>&#10095;</a>
            </div>
            <br /> */}

            {/* <!-- The dots/circles --> */}
            {/* <div style="text-align:center">
                <span className={styles["dot"]} onClick={currentSlide(1)}></span>
                <span className={styles["dot"]} onClick={currentSlide(2)}></span>
                <span className={styles["dot"]} onClick={currentSlide(3)}></span>
            </div> */}

            {/* {{car.price}} */}
            <h2> lv</h2>

            <p>Description</p>
            {/* {{car.description}} */}
            <p style={{color: "#ffff"}}>Cool car</p>
            {/* {{#if isOwner}} */}
            <a href="/edit/{{car._id}}"><button>Edit car ad</button></a>
            <a href="/delete/{{car._id}}"><button>Delete car ad</button></a>
            {/* {{/if}} */}
        </section>
    );
}