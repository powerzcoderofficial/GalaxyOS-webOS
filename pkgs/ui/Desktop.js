export default {
  name: "Desktop",
  description: "Backdrop user interface",
  ver: 1, // Compatible with core v1
  type: "process",
  optInToEvents: true,
  exec: async function (Root) {
    let wrapper; // Lib.html | undefined
    let MyWindow;

    console.log("Hello from example package", Root.Lib);

    wrapper = new Root.Lib.html("div").appendTo("body").class("desktop");

    Root.Lib.setOnEnd(function () {
      clearInterval(timeInterval);
      wrapper.cleanup();
    });

    let Html = Root.Lib.html;

    let vfs = await Root.Core.startPkg("lib:VirtualFS");
    await vfs.importFS();

    let appearanceConfig = JSON.parse(
      await vfs.readFile("Root/Pluto/config/appearanceConfig.json")
    );

    let wallpaper = "./assets/wallpapers/default.svg";

    if (appearanceConfig.wallpaper) {
      wallpaper = appearanceConfig.wallpaper;
    }

    let background = new Html()
      .style({
        "background-image": "url(" + wallpaper + ")",
        "background-size": "cover",
        "background-attachment": "fixed",
        "background-repeat": "no-repeat",
        "background-position": "center",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        transition: "opacity 2s linear",
        opacity: "0",
        width: "100%",
        height: "100%",
        position: "absolute",
        "z-index": "-1",
      })
      .appendTo(wrapper);

    async function refresh() {
      background.style({
        opacity: 1,
        display: "block",
        "z-index": -1,
      });

      let mouseSpace = {
        x: 0,
        y: 0,
      };

      const desktopDirectory = "Root/Desktop";
      const fileList = await vfs.list(desktopDirectory);

      const iconsWrapper = new Root.Lib.html("div")
        .class("desktop-apps")
        .appendTo(wrapper);

      function createDesktopIcon(fileName, icon, fn) {
        const mouse = { x: 0, y: 0 };
        let lastTapTime = 0;
        let iconWrapper = new Root.Lib.html("div")
          .class("desktop-icon")
          .append(
            new Root.Lib.html("div").html(Root.Lib.icons[icon]).class("icon")
          )
          .append(
            new Root.Lib.html("div")
              .append(new Root.Lib.html().text(fileName).class("text"))
              .class("text-wrapper")
          )
          .appendTo(iconsWrapper)
          .on("dblclick", (_) => fn(Root.Core))
          .on("touchstart", (e) => {
            const currentTime = new Date().getTime();
            const tapInterval = currentTime - lastTapTime;

            if (tapInterval < 300 && tapInterval > 0) {
              fn(Root.Core);
              e.preventDefault();
            }

            lastTapTime = currentTime;
          });
        return iconWrapper;
      }

      let FileMappings = await Root.Lib.loadLibrary("FileMappings");

      for (let i = 0; i < fileList.length; i++) {
        let file = fileList[i];

        let mapping = await FileMappings.retrieveAllMIMEdata(
          desktopDirectory + "/" + file.item,
          vfs
        );

        createDesktopIcon(mapping.name, mapping.icon, mapping.onClick);
      }
    }

    const preloadImage = new Image();
    preloadImage.src = wallpaper;
    preloadImage.addEventListener("load", refresh);

    let dock = new Root.Lib.html("div").appendTo(wrapper).class("dock");

    let menuButton = new Root.Lib.html("button")
      .class("toolbar-button")
      .html(
        `<svg width="24" height="24" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" overflow="hidden"><defs><clipPath id="clip0"><rect x="218" y="312" width="250" height="251"/></clipPath></defs><g clip-path="url(#clip0)" transform="translate(-218 -312)"><path d="M343 312 343 332.683 343 332.683C285.341 332.683 238.6 379.611 238.6 437.5L240.175 453.19 272.762 434.301 273.874 423.223C280.453 390.941 308.902 366.659 343 366.659 347.871 366.659 352.627 367.154 357.22 368.098L362.818 369.842 362.818 343.088 363.443 343.088 363.443 314.069 368.192 314.55C425.152 326.252 468 376.852 468 437.5 468 454.828 464.502 471.336 458.177 486.35L450.655 500.264 433.036 490.051 437.105 482.943C443.703 469.196 447.4 453.781 447.4 437.5 447.4 394.083 421.108 356.832 383.637 340.92L381.106 340.131 381.106 378.025 382.45 378.757C401.219 391.488 413.559 413.047 413.559 437.5 413.559 457.062 405.662 474.773 392.893 487.592L391.435 488.8 402.78 495.376 402.419 496.004 438.873 517.135 431.388 526.242C408.768 548.953 377.518 563 343 563 299.853 563 261.811 541.052 239.348 507.668L235.311 500.2 252.801 490.062 253.714 491.852C272.025 522.107 305.162 542.318 343 542.318 364.622 542.318 384.708 535.718 401.371 524.416L407.518 519.324 374.847 500.386 370.465 502.775C362.023 506.359 352.742 508.342 343 508.342 313.773 508.342 288.697 490.501 277.985 465.075L274.682 454.389 258.285 463.894 257.978 463.361 226.378 481.678 220.539 462.793C218.874 454.623 218 446.164 218 437.5 218 368.188 273.964 312 343 312ZM343 406.746C326.083 406.746 312.369 420.515 312.369 437.5 312.369 454.485 326.083 468.254 343 468.254 359.917 468.254 373.631 454.485 373.631 437.5 373.631 420.515 359.917 406.746 343 406.746Z" fill="#FFFFFF" fill-rule="evenodd"/></g></svg>`
      )
      .appendTo(dock);

    let menuIsOpen = false;
    let menuIsToggling = false;
    let menuElm;

    function onClickDetect(ev) {
      if (ev.target.closest(".menu")) {
      } else toggleMenu();
    }

    function onFullClickDetect(ev) {
      if (ev.target.closest(".menu")) {
        if (ev.button === 0) {
          if (ev.target.closest("button") || ev.target.closest(".app")) {
            toggleMenu();
          }
        }
      }
    }

    let FileMappings = await Root.Lib.loadLibrary("FileMappings");

    async function toggleMenu() {
      if (menuIsToggling) {
        return; // Return early if menu is currently toggling
      }

      menuIsToggling = true;
      menuIsOpen = !menuIsOpen;

      const userData = {
        username: 'User',
        pfp: 'assets/pfp.svg',
        onlineAccount: false
      };

      if (menuIsOpen === true) {
        window.addEventListener("mousedown", onClickDetect);
        window.addEventListener("click", onFullClickDetect);
        window.addEventListener("touchstart", onClickDetect);
        window.addEventListener("touchend", onFullClickDetect);
        if (!menuElm) {
          // Create menu element if it doesn't exist
          const desktopApps = (await vfs.list("Root/Desktop"))
            .filter((f) => f.item.endsWith(".shrt"))
            .map((f) => {
              return { type: "desktop", item: f.item };
            });
          const installedApps = (await vfs.list("Root/Pluto/apps"))
            .filter((f) => f.item.endsWith(".app"))
            .map((f) => {
              return { type: "installed", item: f.item };
            });

          const apps = [...installedApps, ...desktopApps];

          const appsHtml = await Promise.all(
            apps.map(async (app) => {
              // console.log(app);
              let icon = "box",
                name = app.item,
                description = null;

              if (app.type === "desktop") {
                const data = await FileMappings.retrieveAllMIMEdata(
                  "Root/Desktop/" + app.item
                );

                icon = data.icon;
                name = data.name;
                description = data.fullName;
              }

              return new Html("div")
                .class("app")
                .appendMany(
                  new Html("div").class("app-icon").html(Root.Lib.icons[icon]),
                  new Html("div")
                    .class("app-text")
                    .appendMany(
                      new Html("div").class("app-heading").text(name),
                      description !== null
                        ? new Html("div")
                            .class("app-description")
                            .text(description)
                        : null
                    )
                )
                .on("click", async (e) => {
                  if (app.type === "desktop") {
                    // View the shortcut file
                    try {
                      let shrt = JSON.parse(
                        await vfs.readFile("Root/Desktop/" + app.item)
                      );

                      // console.log(shrt);

                      if (shrt.fullName) {
                        await Root.Core.startPkg(shrt.fullName, true, true);
                      }
                    } catch (e) {
                      console.log("Couldn't load the application");
                    }
                  } else {
                    try {
                      const appData = await vfs.readFile(
                        "Root/Pluto/apps/" + app.item
                      );
                      await Root.Core.startPkg(
                        "data:text/javascript;base64," + btoa(appData),
                        false,
                        true
                      );
                    } catch (e) {
                      console.log("Couldn't load the application");
                    }
                  }
                });
            })
          );

          menuElm = new Html("div").class("menu").appendMany(
            new Html("div").class("me").appendMany(
              new Html("div").class("pfp").style({
                "--url": `url(${userData.pfp})`,
              }),
              new Html("div")
                .class("text")
                .appendMany(
                  new Html("div").class("heading").text(userData.username),
                  new Html("div")
                    .class("subheading")
                    .text(
                      userData.onlineAccount === true
                        ? "Zeon Account"
                        : "Local Account"
                    )
                ),
              new Root.Lib.html("button")
                .class("small")
                .html(Root.Lib.icons.wrench)
                .on("click", (e) => {
                  Root.Core.startPkg("apps:Settings", true, true);
                }),
              new Root.Lib.html("button")
                .class("small")
                .html(Root.Lib.icons.lock)
                .on("click", async (e) => {
                  let ls = await Root.Core.startPkg(
                    "ui:LockScreen",
                    true,
                    true
                  );
                  ls.loader();
                })
            ),
            new Html("div")
              .class("spacer")
              .appendMany(
                new Html("div").class("space"),
                new Html("div").text("Apps"),
                new Html("div").class("space")
              ),
            new Html("div").class("apps").appendMany(...appsHtml)
          );

          dock.elm.insertBefore(menuElm.elm, dock.elm.lastChild);
        }

        menuElm.classOn("opening");
        setTimeout(() => {
          menuElm.classOff("opening");
          menuIsToggling = false;
        }, 500);
      } else {
        window.removeEventListener("mousedown", onClickDetect);
        window.removeEventListener("touchstart", onClickDetect);
        if (menuElm) {
          menuElm.classOn("closing");
          setTimeout(() => {
            menuElm.cleanup();
            menuElm = null; // Reset menu element reference
            menuIsToggling = false;
          }, 500);
        }
      }
    }

    menuButton.on("click", toggleMenu);

    let dockItems = new Root.Lib.html("div").class("items").appendTo(dock);
    let dockItemsList = [];

    /* quickAccessButton */
    let timeInterval = -1;
    let pastMinute = 0;

    function updateTime() {
      let x = new Date();
      let hours = x.getHours().toString().padStart(2, "0");
      let minutes = x.getMinutes().toString().padStart(2, "0");
      if (pastMinute === minutes) return;
      pastMinute = minutes;
      let timeString = `${hours}:${minutes}`;
      quickAccessButton.text(timeString);
    }

    const quickAccessButton = new Root.Lib.html("div")
      .class("toolbar-button")
      .text("..:..")
      .appendTo(dock);

    updateTime();
    timeInterval = setInterval(updateTime, 1000);

    function createButton(pid, name, onclickFocusWindow) {
      dockItemsList[pid] = new Html()
        .class("dock-item")
        .appendTo(dockItems)
        .on(
          "click",
          (_) =>
            onclickFocusWindow &&
            onclickFocusWindow.focus &&
            onclickFocusWindow.focus()
        )
        .text(name);
    }

    Root.Core.processList
      .filter((n) => n !== null)
      .forEach((a) => {
        if (
          a.name.startsWith("system:") ||
          a.name.startsWith("ui:") ||
          a.name.startsWith("services:")
        )
          return;
        if (!a.proc) return;

        createButton(a.pid, a.proc.name);
      });

    let isCurrentlyChangingWallpaper = false;
    let wallpaperToChangeTo = "";

    // Start the startup apps

    if (await vfs.exists("Root/Pluto/startup")) {
      let startupApps = await vfs.readFile("Root/Pluto/startup").then((e) => {
        return e.split("\n").filter((e) => e !== "");
      });

      if (startupApps.length >= 1) {
        for (let i = 0; i < startupApps.length; i++) {
          let file = startupApps[i];
          let mapping = await FileMappings.retrieveAllMIMEdata(file, vfs);
          console.log(mapping);
          mapping.onClick(Root.Core);
        }
      }
    }

    // scan for dangerous files
    let settingsConfig = JSON.parse(
      await vfs.readFile("Root/Pluto/config/settingsConfig.json")
    );
    console.log(settingsConfig);
    if (settingsConfig === null) {
      await vfs.writeFile(
        "Root/Pluto/config/settingsConfig.json",
        `{"warnSecurityIssues": true}`
      );
      settingsConfig = JSON.parse(
        await vfs.readFile("Root/Pluto/config/settingsConfig.json")
      );
    }

    function smoothlySwapBackground(to) {
      wallpaperToChangeTo = to;
      background.style({
        "background-image": "url(" + wallpaperToChangeTo + ")",
      });
    }

    const WindowSystem = await Root.Lib.loadLibrary("WindowSystem");

    console.log("winSys", WindowSystem, Root.Core.windowsList);

    return Root.Lib.setupReturns(async (m) => {
      try {
        // Got a message
        const { type, data } = m;
        switch (type) {
          case "setWallpaper":
            if (data === "default") {
              appearanceConfig = JSON.parse(
                await vfs.readFile("Root/Pluto/config/appearanceConfig.json")
              );
              smoothlySwapBackground(appearanceConfig.wallpaper);
            } else {
              smoothlySwapBackground(data);
            }
            break;
          case "refresh":
            break;
          case "coreEvent":
            console.log("Desktop received core event", data);

            if (
              data.data.name.startsWith("system:") ||
              data.data.name.startsWith("ui:") ||
              data.data.name.startsWith("services:")
            )
              return;
            if (data.type === "pkgStart") {
              if (dockItemsList[data.data.pid]) return;
              const p = Root.Core.windowsList.find(
                (p) => p.options.pid === data.data.pid
              );
              if (p) {
                console.log("winSys", p);
                createButton(data.data.pid, data.data.proc.name, p);
              }
            } else if (data.type === "pkgEnd") {
              console.log("Cleanup pid", data.data.pid);
              dockItemsList[data.data.pid].cleanup();
              dockItemsList[data.data.pid] = null;
              console.log("Removed", data.data.pid);
            }
            break;
          case "wsEvent":
            if (data.type === "focusedWindow") {
              if (data.data === undefined) return;
              const p = data.data.options.pid;
              dockItemsList
                .filter((n) => n !== null)
                .forEach((pa) => {
                  pa.classOff("selected");
                });
              if (dockItemsList[p] !== undefined)
                if (dockItemsList[p] !== null)
                  dockItemsList[p].classOn("selected");
                else console.log("?!");
            }
            break;
        }
      } catch (e) {
        console.log("desktop oops", e);
      }
    });
  },
};
