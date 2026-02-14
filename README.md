Deployed Link:-
https://qr-code-generator-ng440.netlify.app/

# QR Code Generator - Advanced Edition

A professional, feature-rich QR code generator web application with real-time preview, customization options, and cloud deployment ready.

## ✨ Features

### Core Functionality
- **10 QR Code Types**: Text, URL, Email, Phone, WiFi, Location, Contact, Calendar, SMS, vCard
- **Real-time Generation**: Instant QR code preview as you type
- **Color Customization**: Pick any colors for dark and light modules
- **4 Style Presets**: Classic, Colorful, Neon, and Pastel themes
- **Multiple Export Formats**: PNG, JPG, SVG
- **Error Correction Levels**: L, M, Q, H

### Advanced Features
- **QR History**: Auto-saves last 20 generated QR codes
- **Gallery View**: Visual grid display of all saved QR codes
- **Smart Statistics**: Real-time data capacity, QR version, content length
- **Size Presets**: Quick select buttons (200, 300, 500, 800px)
- **Share Functionality**: Copy to clipboard or use Web Share API
- **User Authentication UI**: Sign In and Sign Up modals
- **Fully Responsive**: Mobile, tablet, and desktop optimized

### Technical Features
- **100% Client-side**: No backend required, no server calls
- **LocalStorage Persistence**: History and settings saved automatically
- **Professional UI/UX**: Modern gradient design with smooth animations
- **Glow Effects**: Premium button styling with visual feedback
- **Accessibility Ready**: Semantic HTML, proper ARIA labels
- **Lightning Fast**: Instant QR generation without lag

## 🎨 User Interface Sections

### Navigation
- Home page with hero section and statistics
- Generator page with advanced control panel
- Gallery page for saved QR codes
- About page for user profile
- Contact page with contact form

### Control Panel
- Content input (textarea with multi-line support)
- QR type selector (10 types with icons)
- Color pickers with live preview
- Error correction dropdown with help text
- Size slider (100-800px) with preset buttons
- Style preset buttons (4 themes)
- Export format selection (PNG, JPG, SVG)

### Preview Panel
- Live QR code display
- Real-time statistics display
- Export action buttons (Download, Copy, Share)
- QR history panel with recent codes

## 🚀 Deployment

### Netlify Deployment (Recommended)

1. **Connect Repository**
   ```bash
   # Option 1: Use Netlify CLI
   npm install -g netlify-cli
   netlify deploy
   ```

2. **Or: Drag & Drop**
   - Go to https://app.netlify.com/drop
   - Drag the project folder to deploy

3. **Or: Git Integration**
   - Push to GitHub/GitLab/Bitbucket
   - Connect repo in Netlify dashboard
   - All files auto-deploy on push

### Files Ready for Deployment
- ✅ `netlify.toml` - Pre-configured with production settings
- ✅ `index.html` - Optimized single-page application
- ✅ `style.css` - Complete responsive styling
- ✅ `script.js` - Full featured JavaScript
- ✅ `user-details.json` - User profile template

## 📁 File Structure

```
QR-Code-Generator/
├── index.html              # Main application (350+ lines)
├── style.css               # Premium styling (1200+ lines)
├── script.js               # Full functionality (700+ lines)
├── netlify.toml            # Deployment configuration
├── user-details.json       # User profile template
└── README.md               # This file
```

## ⚙️ Configuration

### User Details
Edit `user-details.json` to customize user profile:
```json
{
  "user": {
    "name": "Your Name",
    "email": "your.email@example.com",
    "phone": "+1 (555) 123-4567",
    "location": "Your City",
    "title": "Your Title",
    "bio": "Your bio",
    "linkedIn": "https://linkedin.com/in/yourprofile",
    "twitter": "https://twitter.com/yourhandle",
    "github": "https://github.com/yourprofile"
  }
}
```

### Customization Examples

**Change Color Scheme**
- Modify CSS variables in `style.css`:
  ```css
  :root {
    --primary: #667eea;
    --secondary: #764ba2;
    --success: #10b981;
    --error: #ef4444;
  }
  ```

**Add New QR Type**
- Update `qrTypes` object in `script.js`
- Add corresponding type handler in `generateQR()` function

**Adjust Size Limits**
- Modify slider range in `index.html`
- Update related JavaScript handlers

## 💾 Data Storage

### LocalStorage
- `qrHistory`: Array of generated QR codes with timestamps
- `qrSettings`: Current color, size, and error correction preferences
- `currentUser`: Logged-in user information

### Automatic Persistence
- All settings auto-save when you change them
- History updates whenever you generate/export an QR code
- Data persists across browser sessions

## 🔐 Security Features

### Built-in Protection
- Content Security Policy headers configured
- No external CDN dependencies (uses QRCode.js library)
- XSS protection enabled
- CSRF tokens ready for future backend integration
- Frame-busting protection
- No microphone/camera/geolocation permissions requested

### Privacy
- All processing happens client-side
- No data sent to servers
- No tracking or analytics
- No cookies (only localStorage for settings)

## 📊 QR Code Specifications

### Supported Data
- **Text**: Plain text messages (up to 2953 characters)
- **URLs**: Website links and protocols
- **Email**: mailto: protocol support
- **Phone**: tel: protocol support
- **SMS**: smsto: protocol support
- **WiFi**: Network SSID, password, and auth type
- **Contact**: vCard format for contact info
- **Calendar**: Event scheduling support

### Error Correction Levels
- **L**: ~7% recovery capacity (default for small codes)
- **M**: ~15% recovery capacity (recommended, default)
- **Q**: ~25% recovery capacity (higher reliability)
- **H**: ~30% recovery capacity (maximum redundancy)

### Size Range
- **Minimum**: 100px (mobile-friendly)
- **Maximum**: 800px (high-definition)
- **Recommended**: 200-300px (standard use)

## 🎯 Quick Start

1. **Local Testing**
   - Open `index.html` in any modern web browser
   - No installation or build process required

2. **Generate QR Code**
   - Select QR type (URL, Text, Email, etc.)
   - Enter content in the textarea
   - Customize colors and settings
   - Click preview area to generate

3. **Export QR Code**
   - Download: Save as PNG/JPG/SVG
   - Copy: Get QR image in clipboard
   - Share: Use native sharing or copy link

4. **View History**
   - Check QR history panel on right side
   - Click Gallery tab to see all saved codes
   - Delete individual items or clear all history

5. **Deploy Online**
   - Push to Netlify for instant deployment
   - Share live URL with anyone
   - QR codes work globally

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla - no frameworks)
- **QR Library**: QRCode.js (lightweight, efficient)
- **Storage**: Browser LocalStorage API
- **Deployment**: Netlify (static site hosting)
- **Browser Support**: All modern browsers (Chrome, Firefox, Safari, Edge)

## 📱 Responsive Design

### Mobile (< 480px)
- Single column layout
- Stacked control and preview panels
- Optimized button sizes
- Touch-friendly interface

### Tablet (480px - 768px)
- Adjusted spacing and padding
- Readable typography
- Optimized grid layouts
- Smooth transitions

### Desktop (> 768px)
- Full 2-column layout (control + preview)
- Side-by-side panels
- Maximum efficiency
- Feature-rich interface

## ⚡ Performance

- **Load Time**: < 2 seconds (optimized)
- **QR Generation**: Instant (< 100ms)
- **File Size**:
  - HTML: 350 lines (~12KB)
  - CSS: 1200+ lines (~35KB)
  - JavaScript: 700+ lines (~22KB)
- **Library**: QRCode.js (~15KB minified)

## 🐛 Troubleshooting

**QR Code Not Generating**
- Ensure content field is not empty
- Check browser console for errors
- Verify QRCode.js library is loaded

**History Not Saving**
- Check if localStorage is enabled
- Clear browser cache and reload
- Verify localStorage quota is available

**Styling Looks Wrong**
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check for browser extensions interfering

**Export Not Working**
- Browser must support Canvas API
- Ensure pop-ups are not blocked
- Try alternative export method (Copy instead of Download)

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Support

For issues, feature requests, or questions:
1. Check the troubleshooting section above
2. Review browser console for error messages
3. Ensure browser is up-to-date
4. Test in a different browser

## 🎉 Version Info

- **Version**: 2.0 (Advanced Edition)
- **Release Date**: February 2026
- **Status**: Production Ready
- **Last Updated**: February 14, 2026

## 📝 Changelog

### v2.0 - Advanced Edition
- ✨ New hero section with statistics
- ✨ Gallery page for saved QR codes
- ✨ History tracking system
- ✨ 10 QR code types
- ✨ 4 color presets
- ✨ Share functionality
- ✨ Real-time statistics
- ✨ Advanced UI/UX redesign
- 🔧 Refactored JavaScript architecture
- 🔧 Enhanced CSS styling
- 🎨 Modern gradient design
- ⚡ Performance optimizations

### v1.0 - Initial Release
- Basic QR code generation
- Color customization
- Export to PNG/JPG
- Simple user interface

---

**Ready to deploy? Push to Netlify and share your QR codes with the world!** 🚀
