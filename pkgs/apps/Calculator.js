export default {
    name: "Calculator",
    description: "Add, subtract, multiply, and divide numbers!",
    ver: 1,
    type: "process",
    exec: async function (Root) {
      let wrapper; // Lib.html | undefined
      let CalcWindow;
  
      console.log("Hello from example package", Root.Lib);
  
      const Win = (await Root.Lib.loadLibrary("WindowSystem")).win;
      const Html = Root.Lib.html;
  
      CalcWindow = new Win({
        title: "Calculator",
        content: `
        `,
        pid: Root.PID,
        width: 225,
        height: 240,
        minWidth: 225,
        minHeight: 240,
        onclose: () => {
          Root.Lib.onEnd();
        },
      });
  
      Root.Lib.setOnEnd((_) => CalcWindow.close());
  
      wrapper = CalcWindow.window.querySelector(".win-content");
      wrapper = Html.from(wrapper);
  
      wrapper.style({ display: "flex", "flex-direction": "column" });
  
      let calculation = "";
  
      let outputWrapper = new Html("div")
        .style({ display: "flex" })
        .appendTo(wrapper);
      let output = new Root.Lib.html("input")
        .text("")
        .style({ width: "calc(100% - 20px)" }) // decreased width by 20px
        .attr({ readonly: true })
        .appendTo(outputWrapper);
  
      function refreshOutput() {
        output.attr({ value: calculation });
      }
  
      wrapper.on("keydown", (e) => {
        switch (e.key) {
          case "1":
            calculation += "1";
            refreshOutput();
            break;
          case "2":
            calculation += "2";
            refreshOutput();
            break;
          case "3":
            calculation += "3";
            refreshOutput();
            break;
          case "4":
            calculation += "4";
            refreshOutput();
            break;
          case "5":
            calculation += "5";
            refreshOutput();
            break;
          case "6":
            calculation += "6";
            refreshOutput();
            break;
          case "7":
            calculation += "7";
            refreshOutput();
            break;
          case "8":
            calculation += "8";
            refreshOutput();
            break;
          case "9":
            calculation += "9";
            refreshOutput();
            break;
          case "0":
            calculation += "0";
            refreshOutput();
            break;
          case "+":
            calculation += "+";
            refreshOutput();
            break;
          case "-":
            calculation += "-";
            refreshOutput();
            break;
          case "*":
            calculation += "*";
            refreshOutput();
            break;
          case "/":
            calculation += "/";
            refreshOutput();
            break;
          case "Enter":
            let finishedCalc = eval(calculation);
            calculation = finishedCalc;
            output.attr({ value: finishedCalc });
            break;
          case "=":
            let finishedCalc2 = eval(calculation);
            calculation = finishedCalc2;
            output.attr({ value: finishedCalc2 });
            break;
          case "Backspace":
            calculation = calculation.slice(0, -1);
            refreshOutput();
            break;
          case "Escape":
            calculation = "";
            refreshOutput();
            break;
          case "c":
            calculation = "";
            refreshOutput();
            break;
        }
      });
  
      let buttonsWrapper = new Html("div")
        .style({ display: "flex", "flex-direction": "row", "margin-top": "10px" })
        .appendTo(wrapper);
  
      let numbersWrapper = new Html("div")
        .style({ display: "flex", "flex-direction": "column" })
        .appendTo(buttonsWrapper);
  
      let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  
      for (let i = 0; i < numbers.length; i += 3) {
        let row = new Html("div").class("calc-row");
        row.style({ display: "flex", "justify-content": "space-around" });
        for (let j = 0; j < 3; j++) {
          if (i + j < numbers.length) {
            let button = new Html("button").text(numbers[i + j]);
            button.on("click", () => {
              calculation += numbers[i + j];
              refreshOutput();
            });
            row.append(button);
          }
        }
        numbersWrapper.append(row);
      }
  
      let zeroRow = new Html("div")
        .style({ display: "flex", "justify-content": "space-around" })
        .appendTo(numbersWrapper);
  
      let zeroButton = new Html("button")
        .text("0")
        .style({ "flex-grow": 2 });
      zeroButton.on("click", () => {
        calculation += "0";
        refreshOutput();
      });
      zeroRow.append(zeroButton);
  
      let equalsButton = new Html("button").text("=");
      equalsButton.on("click", () => {
        let finishedCalc = eval(calculation);
        calculation = finishedCalc;
        output.attr({ value: finishedCalc });
      });
      zeroRow.append(equalsButton);
  
      let operationsWrapper = new Html("div")
        .style({ display: "flex", "flex-direction": "column", "margin-left": "10px" })
        .appendTo(buttonsWrapper);
  
      let operations = ["+", "-", "*", "/"];
  
      for ( let i = 0; i < operations.length; i++) {
        let button = new Html("button").text(operations[i]);
        button.on("click", () => {
          calculation += operations[i];
          refreshOutput();
        });
        operationsWrapper.append(button);
      }
  
      return Root.Lib.setupReturns((m) => {
        console.log("Example received message: " + m);
      });
    },
  };