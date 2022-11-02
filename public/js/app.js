const logoImg = document.getElementById("logoImg");
const lines = document.getElementsByClassName("style-line");
const logoBtn = document.getElementById("logoBtn");
const myAudio = document.getElementById("myAudio");
const navBtn = document.getElementById("navBtn");
const popupBtn = document.getElementById("popupBtn");
const flash = document.getElementById("flashDiv");

function initialise() {
  if (logoImg) {
    logoAnimate();
  }
  if (logoBtn) {
    logoBtn.addEventListener("click", (e) => {
      logoAnimateComplete(e);
    });
  }
  if (myAudio) {
    const play = document.getElementById("player");
    play.addEventListener("click", () => {
      togglePlay();
    });
  }
  if (logoList) {
    logoListClasser();
  }
  if (navBtn) {
    navBtnEvAdd();
  }
  if (carts.length > 0) {
    cartSelect();
    onLoadCartNumbers();
  }
  if (window.location.href.includes("/cart")) {
    displayCart();
  }
  if (likesDivs) {
    addEventListener("DOMContentLoaded", () => {
      forumTriage();
    });
  }
  if (tx) {
    txGrowth();
  }
  if (popupBtn) {
    const parent = popupBtn.parentElement.parentElement.parentElement;
    addEventListener("DOMContentLoaded", () => {
      parent.classList.add("animatePopup");
    });

    popupBtn.addEventListener("click", () => {
      parent.classList.remove("animatePopup");
      parent.classList.add("reanimatePopup");
    });
  }
  if (flash) {
    flashAnimate();
  }
}

// ===========================================
// LANDING PAGE ANIMATION
// ===========================================

function logoAnimate() {
  logoImg.classList.add("logoAnimate");
  logoBtn.classList.add("btnAnimate");
  for (const line of lines) {
    line.classList.add("lineAnimate");
  }
}

function logoAnimateComplete(ev) {
  ev.preventDefault();
  const frame = window.innerWidth;
  let time;
  if (frame < 769) {
    time = 450;
  } else if (frame < 992) {
    time = 550;
  } else {
    time = 650;
  }
  logoImg.classList.remove("logoAnimate");
  logoImg.classList.add("logoAnimateComplete");
  logoBtn.classList.remove("btnAnimate");
  logoBtn.classList.add("btnAnimateComplete");
  for (const line of lines) {
    line.classList.remove("lineAnimate");
    line.classList.add("lineAnimateComplete");
  }
  setTimeout(() => {
    ev.target.parentElement.submit();
  }, time);
}

// ===============================================
// AUDIO
// ===============================================

let isPlaying = false;

function togglePlay() {
  isPlaying
    ? (myAudio.pause(), toggleIcon2())
    : (myAudio.play(), toggleIcon1());

  myAudio.onplaying = function () {
    isPlaying = true;
  };

  myAudio.onpause = function () {
    isPlaying = false;
  };
}

function toggleIcon1() {
  const myIcon = document.getElementById("myIcon");
  myIcon.classList.remove("fa-play-circle");
  myIcon.classList.add("fa-pause-circle");
}

function toggleIcon2() {
  const myIcon = document.getElementById("myIcon");
  myIcon.classList.remove("fa-pause-circle");
  myIcon.classList.add("fa-play-circle");
}

// =======================================================
// SUBLOGO SCROLL
// =======================================================
const subLogo = document.getElementById("subLogo");
const logoNav = document.getElementById("logoNav");
const logoList = document.getElementById("logoList");

let posTop = 55;
let posRight = 24;
let posCenter = 0;

function logoListClasser() {
  if (window.innerWidth >= 992) {
    logoList.classList.add("logo__list");
    subLogo.classList.add("subLogo--pos");
  } else {
    logoList.classList.remove("logo__list");
    subLogo.classList.remove("subLogo--pos");
  }
}

function range(val, min, max) {
  return val > max ? max : val < min ? min : val;
}

document.addEventListener("wheel", (e) => {
  if (window.innerWidth >= 992) {
    logoShifter(e);
    listShifter(e);
  }
});

function logoShifter(ev) {
  posTop += ev.deltaY * -0.1;
  posTop = range(posTop, 0, 55);
  subLogo.style.top = `${posTop}px`;
}

function listShifter(ev) {
  posRight += ev.deltaY * 0.1;
  posRight = range(posRight, 24, 80);
  logoList.style.right = `${posRight}px`;
}

function navBtnEvAdd() {
  navBtn.addEventListener("click", () => {
    logoRotate();
  });
}

function logoRotate() {
  let el = subLogo.classList;
  const logo1 = "subLogo__img--in";
  const logo2 = "subLogo__img--out";
  if (el.contains(logo1)) {
    el.remove(logo1);
    el.add(logo2);
  } else {
    el.remove(logo2);
    el.add(logo1);
  }
}

// ======================================================
// MERCH AND CART
// ======================================================

let carts = document.querySelectorAll(".add-cart");

let products = [
  {
    name: "T-Shirt",
    tag: "t-shirt",
    price: 20,
    inCart: 0,
  },
  {
    name: "Hoodie",
    tag: "hoodie",
    price: 35,
    inCart: 0,
  },
  {
    name: "Mug",
    tag: "mug",
    price: 8,
    inCart: 0,
  },
];

function cartSelect() {
  for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener("click", () => {
      cartNumbers(products[i]);
      totalCost(products[i]);
      pageScroll();
    });
  }
}

function pageScroll() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  let spanSelect = document.querySelector(".cart span");
  if (productNumbers) {
    spanSelect.textContent = productNumbers;
  }
}

function cartNumbers(product, action) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);

  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (action == "decrease") {
    localStorage.setItem("cartNumbers", productNumbers - 1);
    document.querySelector(".cart span").textContent = productNumbers - 1;
  } else if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product, action) {
  let cartCost = localStorage.getItem("totalCost");

  if (action == "decrease") {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost - product.price);
  } else if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
            <div class="flex__style">
			<div class="product">
			<ion-icon class="delete" name="close-circle-outline"></ion-icon>
			<img src="/img/${item.tag}.jpg">
			<span class="span__style">${item.name}</span>
			</div>
			<div class="price">£${item.price}.00</div>
			<div class="quantity">
				<ion-icon class="decrease" name="caret-back-outline"></ion-icon>
					<span>${item.inCart}</span>
				<ion-icon class="increase" name="caret-forward-outline"></ion-icon>
			</div>
			<div class="total">
			£${item.inCart * item.price}.00
			</div>
			</div>
			`;
    });

    productContainer.innerHTML += `
			<div class="basketTotalContainer">
				<h4 class="basketTotalTitle">
					Basket total:
				</h4>
				<h4 class="basketTotal">
					£${cartCost}.00
				</h4>
				<div class="flex__between">
        <form action="/merch" method="GET" id="backBtn"> 
        <input type="submit" class="btn basebtn" value="Back" form="backBtn">
        </form>
				<button type="button" class="btn basebtn">Check Out</button>
				</div>
				</div>
		`;
  }
  deleteButtons();
  manageQuantity();
}

function deleteButtons() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let deleteButtons = document.querySelectorAll(".products ion-icon.delete");
  let productName;
  let productNumbers = localStorage.getItem("cartNumbers");
  let cartCost = localStorage.getItem("totalCost");

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", () => {
      productName = deleteButtons[i].parentElement.textContent
        .trim()
        .toLowerCase()
        .replace(/ /g, "");

      localStorage.setItem(
        "cartNumbers",
        productNumbers - cartItems[productName].inCart
      );

      localStorage.setItem(
        "totalCost",
        cartCost - cartItems[productName].price * cartItems[productName].inCart
      );

      delete cartItems[productName];
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));

      displayCart();
      onLoadCartNumbers();
    });
  }
}

function manageQuantity() {
  let decreaseButtons = document.querySelectorAll(".decrease");
  let increaseButtons = document.querySelectorAll(".increase");
  let cartItems = localStorage.getItem("productsInCart");
  let currentQuantity = 0;
  let currentProduct = 0;
  cartItems = JSON.parse(cartItems);

  for (let i = 0; i < decreaseButtons.length; i++) {
    decreaseButtons[i].addEventListener("click", () => {
      currentQuantity =
        decreaseButtons[i].parentElement.querySelector("span").textContent;

      currentProduct = decreaseButtons[
        i
      ].parentElement.previousElementSibling.previousElementSibling
        .querySelector("span")
        .textContent.toLowerCase()
        .replace(/ /g, "")
        .trim();

      if (cartItems[currentProduct].inCart > 1) {
        cartItems[currentProduct].inCart -= 1;
        cartNumbers(cartItems[currentProduct], "decrease");
        totalCost(cartItems[currentProduct], "decrease");
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        displayCart();
      }
    });
  }

  for (let i = 0; i < increaseButtons.length; i++) {
    increaseButtons[i].addEventListener("click", () => {
      currentQuantity =
        increaseButtons[i].parentElement.querySelector("span").textContent;
      currentProduct = increaseButtons[
        i
      ].parentElement.previousElementSibling.previousElementSibling
        .querySelector("span")
        .textContent.toLowerCase()
        .replace(/ /g, "")
        .trim();
      cartItems[currentProduct].inCart += 1;
      cartNumbers(cartItems[currentProduct]);
      totalCost(cartItems[currentProduct]);
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
      displayCart();
    });
  }
}
// =========================================================
// FORUM
// =========================================================

const likesDivs = document.getElementsByClassName("likes__div");

function forumTriage(ev) {
  for (let i = 0; i < likesDivs.length; i++) {
    likesDivs[i].addEventListener("click", (e) => {
      if (e.target.textContent === "Reply") {
        console.log("EVENT TARGET:", e.target);
        replyDisplay(e);
        return;
      }
      thumbEvent(e);
      setTimeout(() => {
        likesCaller(e);
      }, 500);
    });
  }
}

function thumbEvent(ev) {
  const event = ev;
  const icon = ev.target;
  const list = icon.classList;
  if (list.contains("fa-thumbs-up")) {
    thumbRotate("likeAnimate", list);
  } else {
    thumbRotate("disLikeAnimate", list);
  }
}

function thumbRotate(style, icon) {
  if (icon.contains(style)) {
    icon.remove(style);
  }
  icon.add(style);
  setTimeout(() => {
    icon.remove(style);
  }, 1000);
}

async function likesCaller(ev) {
  const parent = ev.target.parentElement;
  const titleId = parent.getAttribute("data-id");
  const titleType = parent.getAttribute("data-type");
  const likeClass = ev.target.getAttribute("class");
  let likeValue;
  if (likeClass.includes("up")) {
    likeValue = "likes";
  } else {
    likeValue = "dislikes";
  }
  const options = {
    headers: {
      "comment-id": titleId,
      "comment-type": titleType,
      "like-value": likeValue,
    },
  };
  try {
    const response = await fetch("/likes", options);
    if (response.status === 200) {
      console.log("SUCCESS:", response);
      window.location.reload();
    }
  } catch (err) {
    console.log("ERROR:", err);
  }
}

function replyDisplay(ev) {
  const element = ev.target;
  const commentId = element.getAttribute("data-comment").trim();
  const elId = `replyRow${commentId}`;
  const replyRowId = document.getElementById(elId);
  const spacer = replyRowId.previousElementSibling;
  spacer.classList.add("spacerReveal");
  replyRowId.classList.add("replyDisplay");
}

// =========================================
// TEXTAREA HEIGHT MODIFIER
// =========================================

const tx = document.getElementById("articleText");

function txGrowth() {
  let txHeight;
  if (window.innerWidth > 768) {
    txHeight = 120;
  } else {
    txHeight = 62;
  }
  if (tx.value === "") {
    tx.setAttribute(
      "style",
      "height:" + txHeight + "px; overflow-y:hidden; word-break: break-all;"
    );
  } else {
    tx.setAttribute(
      "style",
      "height:" +
        tx.scrollHeight +
        "px; overflow-y:hidden; word-break: break-all;"
    );
  }
  tx.addEventListener("input", onInput, false);
}

function onInput() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
}

// ============================================
// FLASH ANIMATION
// ============================================

function flashAnimate() {
  flash.classList.remove("flashOut");
  flash.classList.add("flashIn");
  setTimeout(() => {
    flash.classList.remove("flashIn");
    flash.classList.add("flashOut");
  }, 4000);
}

initialise();
