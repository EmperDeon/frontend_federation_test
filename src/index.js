function useDynamicScript(type, url) {
  return new Promise((resolve, reject) => {
    // if (document.querySelector('[data-type="' + type +'"]') !== null) {
    //   return resolve()
    // }

    const element = document.createElement("script");

    element.src = url;
    element.type = "text/javascript";
    element.async = true;
    element.setAttribute('data-type', type)

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${url}`);
      resolve()
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${url}`);
      reject()
    };

    document.head.appendChild(element);
  })
}

async function loadComponent(type, module) {
  // Initializes the share type. This fills it with known provided modules from this build and all remotes
  await __webpack_init_sharing__("default");
  const container = window[type]; // or get the container somewhere else

  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);
  const factory = await window[type].get(module);

  return factory();
}

class ServiceComponent extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    let template = document.createElement("div");
    this.attachShadow({mode: 'open'}).appendChild(template);

    useDynamicScript(this.getAttribute("type"), this.getAttribute("root-url") + 'remoteEntry.js').then(() => {
      loadComponent(this.getAttribute("type"), './' + this.getAttribute("component") + '.js').then((factory) => {
        factory.default(template)
      })
    })
  }
}

customElements.define('service-component', ServiceComponent);
document.body.innerHTML = `
<service-component type="react_app" root-url="http://localhost:8081/" component="Counter">
  <service-component type="vue_app" root-url="http://localhost:8082/" component="Counter"></service-component>
</service-component>

Second:
<service-component type="react_app" root-url="http://localhost:8081/" component="Counter">
  <service-component type="vue_app" root-url="http://localhost:8082/" component="Counter"></service-component>
</service-component>
`
