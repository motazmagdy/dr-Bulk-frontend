import React from 'react';
import OwlCarousel from 'react-owl-carousel2';

const Home = () => {
    const options1 = {
        items: 1,
        nav: false,
        rewind: true,
        autoplay: true,
        loop: true,
        // responsive: {
        //     0: {
        //         items: 1
        //     },
        //     400: {
        //         items: 2
        //     },
        //     600: {
        //         items: 3
        //     }
        // }
    };
    const options2 = {
        items: 1,
        nav: false,
        rewind: true,
        autoplay: true,
        loop: true
    };

    return (
        <>
            <div className="custom-slider m-0 p-0">
                <OwlCarousel options={options1} >
                    <div className="item">
                        <div className="custom-slider-img"> <img src="./images/slider-1.jpg" alt="" /></div>
                        <div className="container">
                            <div className="row">
                                {/* <div className="col-lg-7 col-md-7 col-sm-12  col-xs-12">
                                    <div className="custom-slider-profile">
                                        <div className="back-pic"></div>
                                        <div className="profile"><img src="./images/profile.jpg" alt="" className="img-responsive" /></div>
                                    </div>
                                </div> */}
                                <div className="col-12">
                                    {/* <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12"> */}
                                    <div className="custom-slider-captions">
                                        <h1 className="custom-slider-title">Dr Bulk Gym</h1>
                                        <p className="custom-slider-text hidden-xs">Personal coach | Healthy habits | Track progress </p>
                                        <a href="#" className="btn btn-default btn-lg hidden-sm hidden-xs">About Nutirionist</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="custom-slider-img"><img src="./images/slider-2.jpg" alt="" /></div>
                        <div className="container">
                            <div className="row">
                                {/* <div className="col-lg-7 col-md-7 col-sm-12  col-xs-12"></div> */}
                                <div className="col-12">
                                    {/* <div className="col-lg-5 col-md-5 col-sm-12  col-xs-12"> */}
                                    <div className="custom-slider-captions">
                                        <h1 className="custom-slider-title">Create Lean &amp;
                                            Healthy Body
                                            For Life</h1>
                                        <p className="custom-slider-text hidden-xs">Create Lean | Healthy Body | Healthy Life</p>
                                        <a href="#" className="btn btn-default btn-lg hidden-sm hidden-xs">View My Services</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="custom-slider-img"><img src="./images/slider-3.jpg" alt="" /></div>
                        <div className="container">
                            <div className="row">
                                {/* <div className="col-lg-7 col-md-7 col-sm-12  col-xs-12"></div> */}
                                <div className="col-12">
                                    {/* <div className="col-lg-5 col-md-5 col-sm-12  col-xs-12"> */}
                                    <div className="custom-slider-captions">
                                        <h1 className="custom-slider-title">LET'S BEGIN YOUR
                                            HEALTHIEST JOURNEY
                                            TOGETHER</h1>
                                        <p className="custom-slider-text hidden-xs">Lets Begin | Healthiest Journey | Together </p>
                                        <a href="#" className="btn btn-default btn-lg  hidden-sm hidden-xs">Get started Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </OwlCarousel>
            </div>
            <div className="space-medium bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="section-title">
                                <h1>Specialize in weight management programmes</h1>
                                <p>Specialised advice to assist you in reaching your weight goals.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="service-block ">
                                <div className="service-img"><a href="#"><img src="./images/service-1.jpg" /></a></div>
                                <div className="service-content">
                                    <h3><a href="#">NUTRITION COUNSELING</a></h3>
                                    <p>Aenean luctus erat quis varius sollicitudin. Fusce ac risus arcu. Duis iaculis tristique enim non malesuada. Proin porttitor libero nunc nec luctus risus hendrerit non.</p>
                                    <a href="#" className="btn-link">read more</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="service-block ">
                                <div className="service-img"><a href="#"><img src="./images/service-2.jpg" /></a></div>
                                <div className="service-content">
                                    <h3><a href="#">CORPORATE WELLNESS</a></h3>
                                    <p>Integer dictum et orci ac feugiat. Fusce laoreet mauris et bibendum fringilla. Praesent lectus antte eget tempougiat ac orci. In justo nibh sodales ut imperdiet vel viverra at lectus.</p>
                                    <a href="#" className="btn-link">read more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-medium">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="section-title">
                                <h1>Diet Plans</h1>
                                <p>Once a meal plan is purchased, you should expect to begin your plan in 2 weeks.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="plan-block">
                                <div className="plan-header">
                                    <h3>Weekly Plan</h3>
                                    <p className="plan-price">$99.99</p>
                                </div>
                                <div className="plan-content">
                                    <ul className="angle angle-right">
                                        <li>8 lifestyle-based meal plans </li>
                                        <li>Nutritional data to support macro-nutrient</li>
                                        <li>Access to over 1000+ healthy recipes</li>
                                        <li>A choice of calorie-levels (1200-1500)</li>
                                    </ul>
                                    <a href="#" className="btn btn-default ">Start Your Journey Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="plan-block">
                                <div className="plan-header">
                                    <h3>Monthly Plan </h3>
                                    <p className="plan-price">$199.99</p>
                                </div>
                                <div className="plan-content">
                                    <ul className="angle angle-right">
                                        <li>12 lifestyle-based meal plans </li>
                                        <li>Nutritional data to support calorie counting</li>
                                        <li>Swap to suit your personal taste and lifestyle</li>
                                        <li>3 skill level-based exercise plans </li>
                                    </ul>
                                    {/* <a href="#" className="btn btn-default" style="word-wrap: break-word;">Start Your Journey Now</a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-medium bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6  col-md-6 col-sm-12 col-xs-12">
                            <div className="about-section">
                                <h1>About Nutritionist</h1>
                                <p>Vestibulum quis massa nunroin tincidunt imper odio congue felis Perrnon porttiultricies aurasitame. </p>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mt20">
                                        <h3>My Approaches</h3>
                                        <p>Sed accumsan libero quis lectus tempusmus liberoesw phare enimroin elementum.</p>
                                        <a href="#" className="btn btn-default">More About Me</a>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mt20">
                                        <h3>GETTING STARTED</h3>
                                        <p>Sed accumsan libero quis lectus fermentum ac faucibus tempusn enimroin elementum.</p>
                                        <a href="#" className="btn btn-warning">get-started</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-offset-1 col-lg-5 col-md-5 col-md-offset-1 col-sm-12 col-xs-12">
                            <div className="">
                                <img src="./images/about-pic.jpg" alt="" className="img-responsive" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-medium">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="section-title">
                                <h1>Latest News &amp; Diet Tips</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="post-block">
                                <div className="post-img">
                                    <a href="#" className="imghover">
                                        <img src="./images/post-img-small-1.jpg" alt="" className="img-responsive" /></a>
                                </div>
                                <div className="post-content">
                                    <div className="meta">
                                        <span className="meta-categories"><a href="#">diet tips</a></span>
                                        <span className="meta-date">30 July, 2020</span>
                                    </div>
                                    <h4><a href="#" className="title">Green smoothie to go</a></h4>
                                    <p>Nam vitae aliquet metus semper vehicula juonecin dolor....</p>
                                    <a href="#" className="btn-link">read more</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="post-block">
                                <div className="post-img">
                                    <a href="#" className="imghover">
                                        <img src="./images/post-img-small-2.jpg" alt="" className="img-responsive" />
                                    </a>
                                </div>
                                <div className="post-content">
                                    <div className="meta">
                                        <span className="meta-categories"><a href="#">Weight Loss</a></span>
                                        <span className="meta-date">29 July, 2020</span>
                                    </div>
                                    <h4><a href="#" className="title">Inflammation Fighting Foods</a></h4>
                                    <p>Vitae aliquet metus semperveicula juonecin doloreer ornare....</p>
                                    <a href="#" className="btn-link">read more</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="post-block">
                                <div className="post-img">
                                    <a href="#" className="imghover">
                                        <img src="./images/post-img-small-3.jpg" alt="" className="img-responsive" /></a>
                                </div>
                                <div className="post-content">
                                    <div className="meta">
                                        <span className="meta-categories"><a href="#">Health Care </a></span>
                                        <span className="meta-date">28 July, 2020</span>
                                    </div>
                                    <h4><a href="#" className="title">Habits, health &amp; fitness news catchup</a></h4>
                                    <p>Aliquet metus semper vehiculase juonecin dolor sederate....</p>
                                    <a href="#" className="btn-link">read more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-medium bg-light">
                <div className="container">
                    <div className="testimonial-carousel">
                        {/* <div className="owl-carousel slider"> */}
                        <OwlCarousel options={options2} >
                            <div className="item">
                                <div className="col-lg-offset-3 col-lg-6 col-md-offset-3 col-md-6 col-sm-12 col-xs-12">
                                    <div className="">
                                        <div className="testimonial-content">
                                            <div className="testimonial-icon">
                                                <img src="./images/quote.png" alt="" />
                                            </div>
                                            <div className="">
                                                <ul>
                                                    <li><i className="fa fa-star"></i></li>
                                                    <li><i className="fa fa-star"></i></li>
                                                    <li><i className="fa fa-star"></i></li>
                                                    <li><i className="fa fa-star-half-empty"></i></li>
                                                    <li><i className="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <h2>How Tracy Lost 25 lbs &amp;
                                                Kept It Off</h2>
                                            <p className="testimonial-text">"I am happier and I have a lot more self-confidence when I am very active and eating clean libero purus imperdiet tortor, nec aliquam dui tortor at elit proin ac elit tortor"</p>
                                            <div className="testimonial-meta">
                                                <span>- Tracy Adamcz</span> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="col-lg-offset-3 col-lg-6 col-md-offset-3 col-md-6 col-sm-12 col-xs-12">
                                    <div className="">
                                        <div className="testimonial-content">
                                            <div className="testimonial-icon">
                                                <img src="./images/quote.png" alt="" />
                                            </div>
                                            <div className="">
                                                <ul>
                                                    <li><i className="fa fa-star"></i></li>
                                                    <li><i className="fa fa-star"></i></li>
                                                    <li><i className="fa fa-star"></i></li>
                                                    <li><i className="fa fa-star-half-empty"></i></li>
                                                    <li><i className="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <h2>Help for emotional binge
                                                eating</h2>
                                            <p className="testimonial-text">“I really wanted to change my lifestyle and become more deliberate in making healthy choices. I realized that this wasn’t a feat that I could do by myself. ”</p>
                                            <div className="testimonial-meta">
                                                <span>-Ryder Lothian</span> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="col-lg-offset-3 col-lg-6 col-md-offset-3 col-md-6 col-sm-12 col-xs-12">
                                    <div className="">
                                        <div className="testimonial-content">
                                            <div className="testimonial-icon">
                                                <img src="./images/quote.png" alt="" />
                                            </div>
                                            <div className="">
                                                <ul>
                                                    <li><i className="fa fa-star"></i></li>
                                                    <li><i className="fa fa-star"></i></li>
                                                    <li><i className="fa fa-star"></i></li>
                                                    <li><i className="fa fa-star-half-empty"></i></li>
                                                    <li><i className="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <h2>Help for a better food and
                                                body fit</h2>
                                            <p className="testimonial-text">“I’m very grateful. Her supportive manner has made this task easy. A couple more kilos and I’ll be fitting into my wedding dress, She made me feel confident in her ability to help with my specific health concerns.”</p>
                                            <div className="testimonial-meta">
                                                <span>-Brock Lambrick</span> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </OwlCarousel>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};


export default Home;