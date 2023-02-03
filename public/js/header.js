(($, window, document) => {
  const header = {
    init() {
      this.scrollFn();
      this.linkFn();
      this.imgToggle();
    },
    
    // 헤더 스크롤 이벤트 구현
    scrollFn() {
      const $document = $(document);
      const $window = $(window);
      const $header = $("#header");
      $window.scroll(function () {
        //스클롤 발생하면
        //현재 윈도우 스크롤 탑값을 콘솔에 찍는다
        // console.log($(this).scrollTop());

        if ($(this).scrollTop() >= 199) {
          $header.addClass("on");
        } 
        else {
          $header.removeClass("on");
        }
      });
    },

    // 로그인, 주소 버튼 클릭 시 해당 페이지 이동
    // location.href = 클릭 시 해당 링크로 이동
    linkFn() {
      const $toottipButton = $('#header .tooltip-button');
      const $loginBtn = $('#header .login-btn');
      const $addrBtn = $('#header .addr-btn');

      // 로그인 링크
      $loginBtn.on({
        click(e){
          e.preventDefault();
          location.href = './asd.html';
        }
      });

      // 주소 링크
      // $addrBtn.on({
      //   click(){
      //     location.href = ''
      //   }
      // });
    },

    // header category-bar 이미지 변경 함수
    imgToggle() {
      const $mapBtn         = $("#header .right .map-btn");
      const $heartBtn       = $("#header .right .heart-btn");
      const $cartBtn        = $("#header .right .cart-btn");
      const $menuBarBtn     = $("#header .left .menu-bar-btn");
      const $newYearImg     = $("#header .newyear");
      const $vegetableImg   = $("#header .vegetable");
      const $fruitImg       = $("#header .fruit");
      const $seaFoodImg     = $("#header .seafood");
      const $meatImg        = $("#header .meat");
      const $soupImg        = $("#header .soup");
      const $saladImg       = $("#header .salad");
      const $seasoningImg   = $("#header .seasoning");
      const $coffeeImg      = $("#header .coffee");
      const $cookieImg      = $("#header .cookie");

      $mapBtn.on({
        mouseenter() {
          $(this).children("img").attr("src", "./img/map_hover.svg");
        },
        mouseleave() {
          $(this).children("img").attr("src", "./img/map.svg");
        },
      });
      $heartBtn.on({
        mouseenter() {
          $(this).find("img").attr("src", "./img/heart_hover.svg");
        },
        mouseleave() {
          $(this).find("img").attr("src", "./img/heart.svg");
        },
      });
      $cartBtn.on({
        mouseenter() {
          $(this).find("img").attr("src", "./img/cart_hover.svg");
        },
        mouseleave() {
          $(this).find("img").attr("src", "./img/cart.svg");
        },
      });
      $menuBarBtn.on({
        mouseenter() {
          $(this).children("img").attr("src", "./img/menu_ba_hoverr.svg");
        },
        mouseleave() {
          $(this).children("img").attr("src", "./img/menu_bar.svg");
        },
      });
      $newYearImg.on({
        mouseenter() {
          $(this).find("img").attr("src", "./img/header/2023year-purple.webp");
        },
        mouseleave() {
          $(this).find("img").attr("src", "./img/header/2023year.webp");
        }
      });
      $vegetableImg.on({
        mouseenter(){
          $(this).find("img").attr("src", "./img/header/vegetable-purple.webp");
        },
        mouseleave(){
          $(this).find("img").attr("src", "./img/header/vegetable.webp");
        }
      });
      $fruitImg.on({
        mouseenter(){
          $(this).find("img").attr("src", "./img/header/fruit-purple.webp");
        },
        mouseleave(){
          $(this).find("img").attr("src", "./img/header/fruit.webp");
        }
      });
      $seaFoodImg.on({
        mouseenter(){
          $(this).find("img").attr("src", "./img/header/seafood-purple.webp");
        },
        mouseleave(){
          $(this).find("img").attr("src", "./img/header/seafood.webp");
        }
      });
      $meatImg.on({
        mouseenter(){
          $(this).find("img").attr("src", "./img/header/meat-purple.webp");
        },
        mouseleave(){
          $(this).find("img").attr("src", "./img/header/meat.webp");
        }
      });
      $soupImg.on({
        mouseenter(){
          $(this).find("img").attr("src", "./img/header/soup-purple.webp");
        },
        mouseleave(){
          $(this).find("img").attr("src", "./img/header/soup.webp");
        }
      });
      $saladImg.on({
        mouseenter(){
          $(this).find("img").attr("src", "./img/header/salad-pruple.webp");
        },
        mouseleave(){
          $(this).find("img").attr("src", "./img/header/salad.webp");
        }
      });
      $seasoningImg.on({
        mouseenter(){
          $(this).find("img").attr("src", "./img/header/seasoning-purple.webp");
        },
        mouseleave(){
          $(this).find("img").attr("src", "./img/header/seasoning.webp");
        }
      });
      $coffeeImg.on({
        mouseenter(){
          $(this).find("img").attr("src", "./img/header/coffee-purple.webp");
        },
        mouseleave(){
          $(this).find("img").attr("src", "./img/header/coffee.webp");
        }
      });
      $cookieImg.on({
        mouseenter(){
          $(this).find("img").attr("src", "./img/header/cookie-purple.webp");
        },
        mouseleave(){
          $(this).find("img").attr("src", "./img/header/cookie.webp");
        }
      });
    },
  };

  header.init();
})(jQuery, window, document);
