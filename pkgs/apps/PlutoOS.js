export default {
  name: "PlutoOS",
  description: "Pluto Subsystem",
  ver: 1, // Compatible with core v1
  type: "process",
  privileges: [
    {
      privilege: "startPkg",
      description: "Run applications",
    },
  ],
  exec: async (Root) => {
    let wrapper; // Lib.html | undefined
    let MyWindow;

    Root.Lib.setOnEnd(function () {
      MyWindow.close();
    });

    const L = Root.Lib;
    const C = Root.Core;

    const Html = L.html;

    const Win = (await Root.Lib.loadLibrary("WindowSystem")).win;
    const vfs = await L.loadLibrary("VirtualFS");
    vfs.importFS();
    const FileMappings = await L.loadLibrary("FileMappings");

    MyWindow = new Win({
      title: "Pluto",
      content: '<iframe src="https://pluto-app.zeon.dev">',
      pid: Root.PID,
      width: 869,
      height: 500,
      onclose: () => {
        Root.Lib.onEnd();
      },
    });
  }
}