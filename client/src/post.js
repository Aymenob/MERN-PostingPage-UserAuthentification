import React from 'react'

export const Post = ({Name,Title,Des,Url}) => {
    return (
        <div class="Xcontainer shadow-lg p-3 mb-5 bg-body rounded">
            <div class="col-md-12 col-lg-12">
                <article class="Pvt-post">
                    <div class="row">
                        <div class="col-xs-12 col-sm-5 col-md-5 col-lg-4">
                            <div class="post-type Xpost-img">
                                <a href="#"><img src={Url} class="img-responsive" alt="image post" /></a>
                            </div>
                            <div class="author-info author-info-2">
                                <ul class="list-inline">
                                    <li>
                                        <div class="Xinfo">
                                            <p>Owner:</p>
                                            <strong>{Name}</strong></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-7 col-md-7 col-lg-8">
                            <div class="Xcaption">
                                <h3 class="md-heading"><a href="#">{Title}</a></h3>
                                <p> {Des} </p>
                                <a class="btn btn-default" href="#" role="button">Read More</a> </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>


    )
}
