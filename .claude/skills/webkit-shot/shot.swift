import Cocoa
import WebKit

// usage: shot <url> <out.png> <w> <h> [scrollY] [dark] [cssFile]
let args = CommandLine.arguments
guard args.count >= 5 else {
    print("usage: shot <url> <out.png> <w> <h> [scrollY] [dark] [cssFile]")
    exit(1)
}
let url = URL(string: args[1])!
let outPath = args[2]
let width = Double(args[3])!
let height = Double(args[4])!
let scrollY = args.count > 5 ? Double(args[5])! : 0
let dark = args.count > 6 ? args[6] == "dark" : false
let cssFile = args.count > 7 ? args[7] : ""

let app = NSApplication.shared
app.setActivationPolicy(.prohibited)

let config = WKWebViewConfiguration()
let webView = WKWebView(frame: NSRect(x: 0, y: 0, width: width, height: height), configuration: config)

let window = NSWindow(
    contentRect: NSRect(x: 0, y: 0, width: width, height: height),
    styleMask: [.borderless], backing: .buffered, defer: false)
window.contentView = webView
window.alphaValue = 0
window.orderBack(nil)

final class Nav: NSObject, WKNavigationDelegate {
    func webView(_ w: WKWebView, didFinish n: WKNavigation!) {}
}
let nav = Nav()
webView.navigationDelegate = nav
webView.load(URLRequest(url: url))

func later(_ seconds: Double, _ block: @escaping () -> Void) {
    DispatchQueue.main.asyncAfter(deadline: .now() + seconds, execute: block)
}

later(7) {
    var js = ""
    if dark { js += "document.documentElement.classList.add('dark');" }
    if !cssFile.isEmpty, let css = try? String(contentsOfFile: cssFile, encoding: .utf8) {
        let flat = css.replacingOccurrences(of: "\n", with: " ")
        js += "var s=document.createElement('style');s.textContent='\(flat)';document.head.appendChild(s);"
    }
    js += "window.scrollTo(0, \(scrollY));"
    webView.evaluateJavaScript(js) { _, _ in
        later(2.5) {
            let cfg = WKSnapshotConfiguration()
            cfg.rect = CGRect(x: 0, y: 0, width: width, height: height)
            let probe = ProcessInfo.processInfo.environment["PROBE"] ?? ""
            if !probe.isEmpty {
                webView.evaluateJavaScript(probe) { value, error in
                    print("probe:", value ?? "nil", error.map { "\($0)" } ?? "")
                }
            }
            webView.takeSnapshot(with: cfg) { image, error in
                guard let image = image,
                      let tiff = image.tiffRepresentation,
                      let rep = NSBitmapImageRep(data: tiff),
                      let png = rep.representation(using: .png, properties: [:])
                else {
                    print("snapshot failed: \(String(describing: error))")
                    exit(1)
                }
                try? png.write(to: URL(fileURLWithPath: outPath))
                print("wrote \(outPath) \(Int(image.size.width))x\(Int(image.size.height))")
                exit(0)
            }
        }
    }
}

app.run()
