const assert = require("assert");

it("Should have a text input", async () => {
  const dom = await render("index.html");
  const input = dom.window.document.querySelector("input");
  assert(input);
});

it("Should show a success mesasge with a valid email", async () => {
  const dom = await render("index.html");
  const input = dom.window.document.querySelector("input");
  input.value = "valid@email.com";

  const form = dom.window.document.querySelector("form");
  form.dispatchEvent(new dom.window.Event("submit"));

  const h1 = dom.window.document.querySelector("h1");

  assert.strictEqual(h1.innerHTML, "Looks good!");
});

it("Should show a fail mesasge with an invalid email", async () => {
  const dom = await render("index.html");
  const input = dom.window.document.querySelector("input");
  input.value = "validemail.com";

  const form = dom.window.document.querySelector("form");
  form.dispatchEvent(new dom.window.Event("submit"));

  const h1 = dom.window.document.querySelector("h1");

  assert.strictEqual(h1.innerHTML, "Invalid email");
});
