import { createSignal } from "solid-js";
import imageUpload from "./assets/imageUpload.svg";
import closeEye from "./assets/closeEye.svg";
import openEye from "./assets/openEye.svg";
import styles from "./App.module.css";
import ColorSelector from "./ColorSelector";
import { CopyToClipboard } from "solid-copy-to-clipboard";
import { CodeInput } from "@srsholmes/solid-code-input";
import highlightjs from "highlight.js";
import "./themes/nord-highlight.css";

import("highlight.js/lib/languages/css");

function App() {
  const [source, setSource] = createSignal<string>(
    "0xf1a2d1217d2Fb0aB9E6236951B55545762cd8Ec4"
  );
  const [logo, setLogo] = createSignal<string>(
    "https://858a4917.1080p-only-pugswap.pages.dev/pugswap.webp"
  );
  const [bgColor, setBgColor] = createSignal<string>("182136");
  const [glowColor, setGlowColor] = createSignal<string>("7777ff");
  const [swapFrameBG, setSwapFrameBG] = createSignal<string>("182136");
  const [swapItemBG, setSwapItemBG] = createSignal<string>("293249");
  const [swapItemColor, setSwapItemColor] = createSignal<string>("ffffff");
  const [swapItemButtonBG, setSwapItemButtonBG] =
    createSignal<string>("435278");
  const [swapItemButtonColor, setSwapItemButtonColor] =
    createSignal<string>("ffffff");
  const [dinamicButtonBG, setDinamicButtonBG] = createSignal<string>("435278");
  const [dinamicButtonColor, setDinamicButtonColor] =
    createSignal<string>("ffffff");
  const [dinamicButtonBorder, setDinamicButtonBorder] =
    createSignal<string>("7777ff");

  const [display, setDisplay] = createSignal<boolean>(false);
  const [expertMode, setExpertMode] = createSignal<boolean>(false);
  const [input, setInput] = createSignal<string>("");

  const handleGenerationCLick = () => {
    //check if logo is a valid url
    if (!logo().match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|webp)/g)) {
      alert("Please input a valid image url");
      return;
    }
    //check if source is a valid address
    else if (!source().match(/^0x[a-fA-F0-9]{40}$/g)) {
      alert("Please input a valid wallet address");
      return;
    } else {
      alert("Widget generated");
      setDisplay(true);
    }
  };

  return (
    <>
      <div>
        <div class={expertMode() ? styles.expertMode : styles.normalMode}>
          <h1>Click on the bottom eye icon to generate your personal widget</h1>
          {expertMode() ? (
            <button onClick={() => setExpertMode(false)}>Expert Mode</button>
          ) : (
            <button onClick={() => setExpertMode(true)}>Normal Mode</button>
          )}
        </div>
        {!expertMode() ? (
          <>
            <div id="settings" class={styles.settings}>
              <div class={styles.dropzone}>
                <img src={imageUpload} alt="imageUpload" />
                <h3>Input your logo url </h3>
                <input
                  type="text"
                  placeholder={logo()}
                  onInput={(e) => setLogo(e.target.value)}
                />
                <p
                  style={{
                    "font-size": "0.8rem",
                  }}
                >
                  Image recomendations: <br /> Image should be a 125x125 logo
                </p>
              </div>
              <div class={styles.dropzone}>
                <svg
                  width="50px"
                  height="50px"
                  viewBox="-0.5 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ffffff"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#CCCCCC"
                    stroke-width="0.05"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M18 2.91992V10.9199"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M21.2008 7.71997L18.0008 10.92L14.8008 7.71997"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M10.58 3.96997H6C4.93913 3.96997 3.92178 4.39146 3.17163 5.1416C2.42149 5.89175 2 6.9091 2 7.96997V17.97C2 19.0308 2.42149 20.0482 3.17163 20.7983C3.92178 21.5485 4.93913 21.97 6 21.97H18C19.0609 21.97 20.0783 21.5485 20.8284 20.7983C21.5786 20.0482 22 19.0308 22 17.97V13.8999"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M2 9.96997H5.37006C6.16571 9.96997 6.92872 10.286 7.49133 10.8486C8.05394 11.4112 8.37006 12.1743 8.37006 12.97C8.37006 13.7656 8.05394 14.5287 7.49133 15.0913C6.92872 15.6539 6.16571 15.97 5.37006 15.97H2"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
                <h3>Input your wallet reference</h3>
                <input
                  type="text"
                  placeholder={source()}
                  onInput={(e) => setSource(e.target.value)}
                />
              </div>
              <div class={styles.dropzone} style={{}}>
                <ColorSelector
                  setColor={setBgColor}
                  colorSelected={bgColor()}
                />
                <h3>Set Background Color</h3>
              </div>
              <div class={styles.dropzone}>
                <ColorSelector
                  setColor={setGlowColor}
                  colorSelected={glowColor()}
                />
                <h3>Set Glow Colow</h3>
              </div>{" "}
              <div class={styles.dropzone}>
                <ColorSelector
                  setColor={setSwapFrameBG}
                  colorSelected={swapFrameBG()}
                />
                <h3>Set Widget Color</h3>
              </div>{" "}
              <div class={styles.dropzone}>
                <ColorSelector
                  setColor={setSwapItemBG}
                  colorSelected={swapItemBG()}
                />
                <h3>Set input Background</h3>
              </div>{" "}
              <div class={styles.dropzone}>
                <ColorSelector
                  setColor={setSwapItemColor}
                  colorSelected={swapItemColor()}
                />
                <h3>Set input font color</h3>
              </div>{" "}
              <div class={styles.dropzone}>
                <ColorSelector
                  setColor={setSwapItemButtonBG}
                  colorSelected={swapItemButtonBG()}
                />
                <h3>Set Buttons Backgound</h3>
              </div>{" "}
              <div class={styles.dropzone}>
                <ColorSelector
                  setColor={setSwapItemButtonColor}
                  colorSelected={swapItemButtonColor()}
                />
                <h3>Set Buttons font color</h3>
              </div>{" "}
              <div class={styles.dropzone}>
                <ColorSelector
                  setColor={setDinamicButtonBG}
                  colorSelected={dinamicButtonBG()}
                />
                <h3>Set Main Button Backgound</h3>
              </div>{" "}
              <div class={styles.dropzone}>
                <ColorSelector
                  setColor={setDinamicButtonColor}
                  colorSelected={dinamicButtonColor()}
                />
                <h3>Set Main Button Font Color</h3>
              </div>{" "}
              <div class={styles.dropzone}>
                <ColorSelector
                  setColor={setDinamicButtonBorder}
                  colorSelected={dinamicButtonBorder()}
                />
                <h3>Set Main Button Border</h3>
              </div>{" "}
            </div>
            <div
              id="generate"
              class={styles.generate}
              onClick={handleGenerationCLick}
            >
              <img
                src={!display() ? openEye : closeEye}
                alt="closeEye"
                width={70}
              />
            </div>
          </>
        ) : (
          <>
            <h1>Create your own styles</h1>
            <h1 style={{ color: "red" }}>
              still not functional... on working...
            </h1>
            background:
            <CodeInput
              autoHeight={true}
              resize="both"
              placeholder="Input your code here..."
              highlightjs={highlightjs}
              onChange={setInput}
              value={input()}
              language={"css"}
            />
            frame:
            <CodeInput
              autoHeight={true}
              resize="both"
              placeholder="Input your code here..."
              highlightjs={highlightjs}
              onChange={setInput}
              value={input()}
              language={"css"}
            />
            swapItem:
            <CodeInput
              autoHeight={true}
              resize="both"
              placeholder="Input your code here..."
              highlightjs={highlightjs}
              onChange={setInput}
              value={input()}
              language={"css"}
            />
            dinamicButton:
            <CodeInput
              autoHeight={true}
              resize="both"
              placeholder="Input your code here..."
              highlightjs={highlightjs}
              onChange={setInput}
              value={input()}
              language={"css"}
            />
          </>
        )}

        <div
          id="preview"
          class="preview"
          style={!display() ? { display: "none" } : { display: "grid" }}
        >
          <iframe
            id="iframeId"
            class={styles.iframe}
            src={`https://ba2353a3.widget-alpha.pages.dev?source=${source()}&logo=${logo()}&bg=${bgColor()}&glow=${glowColor()}&fbg=${swapFrameBG()}&sibg=${swapItemBG()}&sic=${swapItemColor()}&sibbg=${swapItemButtonBG()}&sibc=${swapItemButtonColor()}&dbbg=${dinamicButtonBG()}&dbc=${dinamicButtonColor()}&dbbr=${dinamicButtonBorder()}`}
            width="100%"
            height="400"
            style={{
              "border-style": "none",
              "border-radius": "10px",
            }}
          />
          <CopyToClipboard
            text={`<iframe src="https://ba2353a3.widget-alpha.pages.dev?source=${source()}&logo=${logo()}&bg=${bgColor()}&glow=${glowColor()}&fbg=${swapFrameBG()}&sibg=${swapItemBG()}&sic=${swapItemColor()}&sibbg=${swapItemButtonBG()}&sibc=${swapItemButtonColor()}&dbbg=${dinamicButtonBG()}&dbc=${dinamicButtonColor()}&dbbr=${dinamicButtonBorder()}" width="100%" height="400px" style="border-style: none; border-radius: 10px"; />`}
            onCopy={() => alert("Copied to clipboard")}
            eventTrigger="onClick"
          >
            <div
              style={{
                "font-size": "1.8rem",
                cursor: "pointer",
              }}
            >
              Copy to clipboard ✨
            </div>
          </CopyToClipboard>
          <p class={styles.frametext}>
            {`<iframe  src="https://ba2353a3.widget-alpha.pages.dev?source=${source()}&logo=${logo()}&bg=${bgColor()}&glow=${glowColor()}&fbg=${swapFrameBG()}&sibg=${swapItemBG()}&sic=${swapItemColor()}&sibbg=${swapItemButtonBG()}&sibc=${swapItemButtonColor()}&dbbg=${dinamicButtonBG()}&dbc=${dinamicButtonColor()}&dbbr=${dinamicButtonBorder()}" width="100%" height="400px" style="border-style: none; border-radius: 10px"; />`}
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
