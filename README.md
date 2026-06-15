# 🐧 Linux VM Browser

A full Linux virtual machine running directly in your browser! No installation required.

## Features

- ✅ Full Linux OS in your browser
- ✅ No downloads or installation needed
- ✅ Works offline (after initial load)
- ✅ Multiple Linux distributions (Alpine, Debian)
- ✅ Adjustable CPU cores and RAM
- ✅ Persistent file system
- ✅ Fullscreen mode
- ✅ Dark/Light theme

## How It Works

This app uses:
- **v86**: JavaScript-based x86 PC emulator
- **WebAssembly**: For high performance
- **HTML5 Canvas**: For display rendering
- **Web Storage**: For persistence

## Getting Started

### Online (GitHub Pages)

Visit: `https://evanbtodabeat.github.io/linux-vm-browser`

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/evanbtodabeat/linux-vm-browser.git
cd linux-vm-browser
```

2. Run a local server:
```bash
python -m http.server 8000
```

3. Open in your browser: `http://localhost:8000`

## Usage

1. **Start VM**: Click "Start VM" button
2. **Interact**: Click inside the VM screen to focus
3. **Release Mouse**: Press Ctrl+Alt to release mouse
4. **Fullscreen**: Click "Fullscreen" for full-screen experience
5. **Adjust Settings**: Configure CPU, RAM, and distribution in Settings tab

## System Requirements

- Modern browser (Chrome, Firefox, Safari, Edge)
- 2GB+ RAM recommended
- 500MB disk space
- JavaScript enabled

## Keyboard Shortcuts

- `Ctrl+Alt`: Release mouse focus
- `F11`: Browser fullscreen (when in fullscreen mode)
- Standard Linux keyboard shortcuts work inside the VM

## Troubleshooting

### VM won't start
- Check browser console for errors
- Ensure JavaScript is enabled
- Try a different browser
- Clear browser cache and try again

### Slow performance
- Close other browser tabs
- Reduce allocated RAM/CPU cores
- Use Alpine Linux (lighter weight)
- Use a modern browser (Chrome/Firefox recommended)

## Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome  | ✅ Yes  | Best performance |
| Firefox | ✅ Yes  | Good performance |
| Safari  | ✅ Yes  | Good performance |
| Edge    | ✅ Yes  | Chromium-based |

## License

MIT License - See LICENSE file for details

## Credits

- **v86** - JavaScript x86 emulator
- **WebAssembly** - https://webassembly.org/
- Linux distributions and their respective maintainers

## Resources

- v86 Project: https://github.com/serenity-os/serenity
- MDN Web Docs: https://developer.mozilla.org/
- Linux Documentation: https://www.linux.org/

---

**Made with ❤️ for Linux enthusiasts**