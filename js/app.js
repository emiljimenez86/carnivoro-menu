const icons = {
  parrilla: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3c2 3 2.5 5 0 8-2.5-3-2-5 0-8Z"/><path d="M8.5 8c1.4 2.2 1.7 3.7 0 6-1.7-2.3-1.4-3.8 0-6Z"/><path d="M15.5 8c1.4 2.2 1.7 3.7 0 6"/><path d="M5 14c2.8 1.2 5.2 1.8 7 1.8s4.2-.6 7-1.8"/><path d="M7 18h10"/></svg>`,
  pinchos: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20 20 4"/><circle cx="9" cy="11" r="2.1"/><circle cx="13" cy="7" r="2.1"/><path d="M7 16c.8-.8 2.2-.8 3 0"/></svg>`,
  chuzo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 19 19 5"/><path d="M8 16c1.4-1.8 3.8-2 5.4-.4"/><path d="M11 13c1.4-1.8 3.8-2 5.4-.4"/><circle cx="16.5" cy="7.5" r="1.6"/></svg>`,
  chorizos: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 10c2-4 10-4 12 0 2 4-1 8-6 8s-8-4-6-8Z"/><path d="M9 10.5v5M12 9.5v7M15 10.5v5"/></svg>`,
  adiciones: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><path d="M12 8v8M8 12h8"/></svg>`,
  jugos: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 6h10l-1.2 13a2 2 0 0 1-2 1.8H10.2a2 2 0 0 1-2-1.8L7 6Z"/><path d="M7 6c.4-2 2.2-3.5 5-3.5S16.6 4 17 6"/><path d="M12 10v6"/></svg>`,
  bebidas: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 4h8l-1 14a3 3 0 0 1-3 2.7A3 3 0 0 1 9 18L8 4Z"/><path d="M8 8h8"/><path d="M15.5 4c.6-1.2 1.8-2 3.2-2"/></svg>`,
};

const viewEl = document.getElementById("view");

function getCategory(id) {
  return menuData.categories.find((category) => category.id === id);
}

function currentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  if (hash) {
    const [name, id] = hash.split("/");
    return { name, id };
  }
  const cat = new URLSearchParams(window.location.search).get("cat");
  if (cat) return { name: "categoria", id: cat };
  return { name: "home" };
}

function goHome() {
  window.location.hash = "";
}

function goCategory(id) {
  window.location.hash = `categoria/${id}`;
}

function orderDishName(category, item) {
  if (category.id === "jugos") return `Jugo de ${item.name}`;
  return item.name;
}

function orderMessage(dishName, extra = "") {
  const detail = extra ? ` ${extra}` : "";
  return `¡Hola, Carnívoro! 🔥 Me antojó *${dishName}*${detail} y quiero pedirlo a domicilio. ¿Me lo dejan listo? 😉`;
}

function orderUrl(dishName, extra = "") {
  const phone = contactData.whatsappOrder.phone;
  return `https://wa.me/${phone}?text=${encodeURIComponent(orderMessage(dishName, extra))}`;
}

function juiceChooser(item, index) {
  if (!item.bases) return "";
  const options = item.bases
    .map((base) => {
      const label = base === "leche" ? "En leche" : "En agua";
      return `
        <label class="chulo">
          <input type="radio" name="base-${index}" value="${base}" />
          <span class="chulo-box" aria-hidden="true"></span>
          ${label}
        </label>
      `;
    })
    .join("");
  return `
    <fieldset class="juice-bases">
      <legend>¿En leche o en agua?</legend>
      ${options}
    </fieldset>
  `;
}

function bindJuiceOrders() {
  viewEl.querySelectorAll(".dish[data-juice]").forEach((dish) => {
    const dishName = dish.dataset.juice;
    const btn = dish.querySelector(".order-btn");
    const basesEl = dish.querySelector(".juice-bases");
    if (!btn || !basesEl) return;

    const selectedBase = () => {
      const checked = dish.querySelector("input[type=radio]:checked");
      return checked ? checked.value : "";
    };

    const extraText = (base) => (base === "leche" ? "en leche" : base === "agua" ? "en agua" : "");

    const syncLink = () => {
      const extra = extraText(selectedBase());
      btn.href = orderUrl(dishName, extra);
      btn.setAttribute(
        "aria-label",
        extra
          ? `Pedir ${dishName} ${extra} a domicilio por WhatsApp`
          : `Pedir ${dishName} a domicilio por WhatsApp`
      );
    };

    dish.querySelectorAll("input[type=radio]").forEach((input) => {
      input.addEventListener("change", () => {
        basesEl.classList.remove("is-needed");
        syncLink();
      });
    });

    btn.addEventListener("click", (event) => {
      if (selectedBase()) {
        syncLink();
        return;
      }
      event.preventDefault();
      basesEl.classList.add("is-needed");
    });
  });
}

function renderHome() {
  const cards = menuData.categories
    .map((category, index) => {
      return `
        <button class="category-card" data-id="${category.id}" style="--smoke-delay: ${index * 0.4}s">
          <span class="tacks" aria-hidden="true"><i></i><i></i></span>
          <span class="smoke" aria-hidden="true"><span></span><span></span><span></span><span></span></span>
          <span class="icon" aria-hidden="true">${icons[category.id]}</span>
          <h2>${category.name}</h2>
        </button>
      `;
    })
    .join("");

  const socials = contactData.links
    .map((link) => {
      const img = `<img src="${link.icon}" alt="${link.name}" />`;
      if (!link.href) {
        return `<span class="social-btn is-soon" title="Facebook próximamente">${img}</span>`;
      }
      const extra = link.href.startsWith("http") ? ` target="_blank" rel="noopener noreferrer"` : "";
      return `<a class="social-btn" href="${link.href}" aria-label="${link.name}"${extra}>${img}</a>`;
    })
    .join("");

  viewEl.innerHTML = `
    <header class="home-header">
      <div class="logo-stage">
        <div class="logo-glow" aria-hidden="true"></div>
        <div class="smoke" aria-hidden="true">
          <span></span><span></span><span></span>
          <span></span><span></span><span></span>
        </div>
        <div class="logo-wrap">
          <img src="image/logo.jpeg" alt="Logo de Carnívoro" />
        </div>
      </div>
      <p class="kicker">Menú digital</p>
      <p class="tagline">${menuData.tagline}</p>
      <div class="divider" aria-hidden="true"></div>
    </header>
    <section class="category-grid" aria-label="Menú">${cards}</section>
    <section class="contact">
      <h2>${contactData.title}</h2>
      <div class="socials">${socials}</div>
      <p class="address-label">${contactData.address.label}</p>
      <a
        class="address-link"
        href="${contactData.address.href}"
        target="_blank"
        rel="noopener noreferrer"
      >${contactData.address.lines.join("<br>")}</a>
    </section>
  `;

  viewEl.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", () => goCategory(card.dataset.id));
  });
}

function renderCategory(id) {
  const category = getCategory(id);
  if (!category) {
    goHome();
    return;
  }

  const note = category.note
    ? `<aside class="note"><strong>Incluye en todos los platos</strong>${category.note}</aside>`
    : "";

  const dishes = category.items
    .map((item, index) => {
      const price = item.priceLabel || formatPrice(item.price);
      const description = item.description ? `<p>${item.description}</p>` : "";
      const dishName = orderDishName(category, item);
      const order = contactData.whatsappOrder;
      const juice = juiceChooser(item, index);
      return `
        <article class="dish"${item.bases ? ` data-juice="${dishName}"` : ""}>
          <span class="tacks" aria-hidden="true"><i></i><i></i></span>
          <div class="dish-main">
            <h3>${item.name}</h3>
            <span class="price">${price}</span>
          </div>
          ${description}
          ${juice}
          <a
            class="order-btn"
            href="${orderUrl(dishName)}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pedir ${dishName} a domicilio por WhatsApp"
          >
            <img src="${order.icon}" alt="" />
            ${order.label}
          </a>
        </article>
      `;
    })
    .join("");

  viewEl.innerHTML = `
    <header class="category-header">
      <button class="back-btn" type="button" aria-label="Volver al menú">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 6 9 12l6 6"/>
        </svg>
      </button>
      <div>
        <h1>${category.name}</h1>
      </div>
    </header>
    ${note}
    <section class="dish-list">${dishes}</section>
  `;

  viewEl.querySelector(".back-btn").addEventListener("click", goHome);
  bindJuiceOrders();
}

function render() {
  viewEl.classList.remove("view");
  void viewEl.offsetWidth;
  viewEl.classList.add("view");

  const route = currentRoute();
  if (route.name === "categoria") {
    renderCategory(route.id);
    return;
  }
  renderHome();
}

window.addEventListener("hashchange", render);
render();
