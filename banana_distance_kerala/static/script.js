
const fromEl = document.getElementById("from");
const toEl = document.getElementById("to");
const swapBtn = document.getElementById("swap");
const calculateBtn = document.getElementById("calculate");
const result = document.getElementById("result");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

swapBtn.addEventListener("click", () => {
  [fromEl.value, toEl.value] = [toEl.value, fromEl.value];
});

calculateBtn.addEventListener("click", async () => {
  error.style.display = "none";
  result.style.display = "none";

  if (!fromEl.value || !toEl.value) {
    error.textContent = "🍌 Please choose both districts first!";
    error.style.display = "block";
    return;
  }

  const banana = document.querySelector('input[name="banana"]:checked').value;

  loading.style.display = "block";
  calculateBtn.disabled = true;

  try {
    const response = await fetch("/calculate", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        from: fromEl.value,
        to: toEl.value,
        banana: banana
      })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Something went wrong.");

    document.getElementById("routeText").textContent =
      `${fromEl.value} → ${toEl.value}`;

    document.getElementById("bananaCount").textContent =
      Number(data.banana_count).toLocaleString("en-IN");

    document.getElementById("bananaWord").textContent =
      `${data.banana_name.toUpperCase()} BANANAS 🍌`;

    document.getElementById("distance").textContent =
      `Actual estimated road distance: ${data.distance_km} km`;

    document.getElementById("joke").textContent =
      data.message;

    document.getElementById("method").textContent =
      data.method === "road"
        ? "Road distance calculated using OpenStreetMap routing data."
        : "Routing service unavailable — showing straight-line fallback distance.";

    result.style.display = "block";
    result.scrollIntoView({behavior: "smooth", block: "center"});
  } catch (e) {
    error.textContent = "🍌 " + e.message;
    error.style.display = "block";
  } finally {
    loading.style.display = "none";
    calculateBtn.disabled = false;
  }
});
