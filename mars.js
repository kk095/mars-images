jQuery(function ($) {
    $(document).ajaxStart(function(){
        $(document.createElement("div")).html("Loading....").css({
            width: "90%",
            height: "90%",
            display: "flex",
            fontSize:"2.5rem",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold"
        }).attr("id","loading") .appendTo($(".images"))
    })
    $(document).ajaxStop(function(){
        $("#loading").hide();
    })
    let totalPage = 0;
    let currentPage = 0;
    let photos;
    const h = $(".container").height();
    const btnDiv = $(".btn-div").height();
    $(".images").height((window.innerHeight) - (h + btnDiv + 28));

    $("#next").button({
        disabled: true
    });
    $("#prev").button({
        disabled: true
    });
    $(".get-images").button().click(function () {
        let sol = $("#sol").val();
        if (sol === "") {
            alert("insert inputs !");
            location.reload();
        }
        else {
            $(".images").empty();
            totalPage = 0;
            currentPage = 0;
            $("#prev").button("option", "disabled", true);
        }
        function showImage(data) {
            photos = data.photos;
            if (data.photos.length === 0) {
                totalPage = 0;
                currentPage = 0;
                $(document.createElement("div")).html("No Images").css({
                    width: "100%",
                    height: "100%",
                    backgroundColor: "lightgrey",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold"
                }).appendTo($(".images"))
            }
            else if (data.photos.length <= 25) {
                totalPage = 1;
                currentPage = 1;
                $.each(data.photos, function (key, pic) {
                    $(document.createElement("div")).css({
                        width: "200px",
                        height: "200px",
                        background: `url(${pic.img_src})`,
                        backgroundPosition: "center",
                        backgroundSize: "Contain",
                        margin: "5px 5px"
                    }).appendTo($(".images"))

                })
            }
            else if (data.photos.length > 25) {
                $("#next").button("option", "disabled", false);
                totalPage = Math.ceil(data.photos.length / 25);
                currentPage += 1;
                $.each(data.photos, function (key, pic) {
                    if (key <= 24) {

                        $(document.createElement("div")).css({
                            width: "200px",
                            height: "200px",
                            background: `url(${pic.img_src})`,
                            backgroundPosition: "center",
                            backgroundSize: "Contain",
                            margin: "5px 5px"
                        }).appendTo($(".images"))
                    }
                    else {
                        return false;
                    }

                })

            }
            if (currentPage >= totalPage) {
                $("#next").button("option", "disabled", true);
            } else {
                $("#next").button("option", "disabled", false);
            }
            if (currentPage <= 1) {
                $("#prev").button("option", "disabled", true);
            }
            else {
                $("#prev").button("option", "disabled", false);
            }

        }
        $.ajax({
            url: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
            method: "get",
            success: showImage,
            data: {
                sol: sol,
                api_key: "zuat0aRRBxtFXJqVbOZOKQKCgNgzyhejQgNxjAUY"
            }
        }).fail(function (xhr, text, error) {
            $(document.createElement("div")).html("something error").css({
                width: "100%",
                height: "100%",
                backgroundColor: "lightgrey",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold"
            }).appendTo($(".images"))
            console.log(error);

        })

    });

    $("#next").click(function () {
        let count = currentPage * 25;
        currentPage += 1;
        if (currentPage >= totalPage) {
            $("#next").button("option", "disabled", true);
        } else {
            $("#next").button("option", "disabled", false);
        }
        if (currentPage <= 1) {
            $("#prev").button("option", "disabled", true);
        }
        else {
            $("#prev").button("option", "disabled", false);
        }
        $(".images").empty();
        $.each(photos, function (key, value) {
            if (key >= count) {
                if (key < (count + 25)) {
                    $(document.createElement("div")).css({
                        width: "200px",
                        height: "200px",
                        background: `url(${value.img_src})`,
                        backgroundPosition: "center",
                        backgroundSize: "Contain",
                        margin: "5px 5px"
                    }).appendTo($(".images"))

                }
                else {
                    return false;
                }
            }
        })

    })
    $("#prev").click(function () {
        currentPage -= 1;
        let count = currentPage * 25;
        if (currentPage >= totalPage) {
            $("#next").button("option", "disabled", true);
        } else {
            $("#next").button("option", "disabled", false);
        }
        if (currentPage <= 1) {
            $("#prev").button("option", "disabled", true);
        }
        else {
            $("#prev").button("option", "disabled", false);
        }
        $(".images").empty();
        $.each(photos, function (key, value) {
            if (key >= (count - 25)) {
                if (key < count) {
                    $(document.createElement("div")).css({
                        width: "200px",
                        height: "200px",
                        background: `url(${value.img_src})`,
                        backgroundPosition: "center",
                        backgroundSize: "Contain",
                        margin: "5px 5px"
                    }).appendTo($(".images"))

                }
                else {
                    return false;
                }
            }
        })

    })
})