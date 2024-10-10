export default {
  name: "FTGSF",
  description: "Generates shortcuts for applications on the Desktop.",
  ver: 1, // Compatible with core v1
  type: "process",
  exec: async function (Root) {
    let wrapper; // Lib.html | undefined\

    console.log("generating shortcuts for applications on the desktop");

    const vfs = await Root.Lib.loadLibrary("VirtualFS");
    await vfs.importFS();

    // task manager
    // file manager
    // image viewer
    // notepad
    // weather
    // DevEnv

    let shortcutsList = [
      { name: "AzuOS", icon: "monitor", fullName: "apps:AzuOS"},
      { name: "Browser", icon: "globe", fullName: "apps:Browser" },
      { name: "Calculator", icon: "calculator", fullName: "apps:Calculator" },
      { name: "Clantum Store", icon: "bag", fullName: "apps:AppStore" },
      { name: "CloudOS", icon: "cloudy", fullName: "apps:CloudOS" },
      { name: "CodeEdit", icon: "fileJson", fullName: "apps:DevEnv" },
      { name: "Galaxy Manager", icon: "folders", fullName: "apps:FileManager" },
      { name: "Image View", icon: "image", fullName: "apps:ImageViewer" },
      { name: "Notes", icon: "note", fullName: "apps:Notepad" },
      { name: "Pluto", icon: "powerButton", fullName: "apps:PlutoOS"},
      { name: "Settings", icon: "wrench", fullName: "apps:Settings" },
      { name: "Task Manager", icon: "cpu", fullName: "apps:TaskManager" },
      { name: "Terminal", icon: "terminal", fullName: "apps:Terminal" },
      { name: "Weather", icon: "cloud", fullName: "apps:Cloudburst" },
    ];
    console.log(shortcutsList.length);
    for (let i = 0; i < shortcutsList.length; i++) {
      await vfs.writeFile(
        "Root/Desktop/" + shortcutsList[i].name.replace(" ", "") + ".shrt",
        JSON.stringify(shortcutsList[i])
      );
    }
    Root.Lib.setOnEnd();
    Root.Lib.onEnd();

    return Root.Lib.setupReturns((m) => {
      console.log("Example received message: " + m);
    });
  },
};
