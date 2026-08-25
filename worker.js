export default {
  async fetch(request) {
    return new Response("Nexora AI Backend działa! 🚀", {
      headers: {
        "content-type": "text/plain; charset=UTF-8"
      }
    });
  }
};
