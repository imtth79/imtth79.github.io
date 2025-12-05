# Academic Portfolio

A modern, clean academic portfolio website for a Computer Science student, inspired by professional academic portfolio designs.

## Features

- 🎓 Academic-focused two-column layout
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Smooth scrolling navigation
- 📰 News/Updates section
- 📄 Publications section
- 🔬 Research interests section
- 🎯 Academic service section
- 🖼️ Profile picture support
- 📝 Blog system with localStorage (no database needed)
- 📄 CV/Resume download support

## File Structure

```
MyPortfolio/
├── index.html          # Main HTML file
├── blog.html           # Blog page
├── css/
│   ├── styles.css      # Portfolio styling
│   └── blog.css        # Blog styling
├── js/
│   ├── script.js       # Portfolio JavaScript
│   └── blog.js         # Blog management system
├── assets/
│   ├── images/         # Profile picture and other images
│   └── cv.pdf          # Your CV/Resume (add your file here)
└── README.md           # This file
```

## Getting Started

1. Open `index.html` in your web browser
2. Customize the content with your personal information:
   - Replace `[Your Name]` with your actual name
   - Add your profile picture to `assets/images/profile.jpg`
   - Update education details (university, dates, GPA)
   - Add your news/updates
   - Add your publications (if any)
   - Update projects with descriptions and links
   - Update research interests
   - Add your contact information (email, LinkedIn, GitHub)
   - **Add your CV/Resume**: Place your CV file as `assets/cv.pdf` (the link is already set up in the sidebar)

## Customization Guide

### Personal Information
- **Name**: Search for `[Your Name]` and replace throughout the file
- **Profile Picture**: Add your photo as `assets/images/profile.jpg` (recommended size: 200x200px or square)
- **Role**: Update "CS Student" to match your current role
- **University**: Update the university name and link
- **Location**: Update your current location

### News Section
- Add your recent achievements, updates, or milestones
- Format: Date followed by description
- Example: "Dec 2024" - "Started working on [Project Name]"

### Publications
- Add your academic publications if you have any
- Include: title, authors, venue, and links (PDF, webpage)
- Add thumbnail images if available (150x100px recommended)

### Projects
- Replace placeholder projects with your actual projects
- Update project descriptions
- Add real GitHub and demo links
- Modify technology tags to match your projects

### Research Interests
- Update the list in the sidebar to reflect your actual research interests
- Keep it concise (3-5 items recommended)

### Academic Service
- Add any reviewing activities or academic service
- Example: "Reviewer: Conference Name Year"

### Skills & Education
- Update education details with your actual information
- Modify coursework list as needed

### CV/Resume
- **To add your CV**: Simply place your CV file in the `assets/` folder and name it `cv.pdf`
- The CV link in the sidebar will automatically work once the file is added
- Supported formats: PDF (recommended), or you can change the file extension in `index.html` if using other formats

### Contact Information
- Update email address
- Update social media links (GitHub, LinkedIn)
- Update location

### Blog System
- Access the blog at `blog.html`
- **To add blog posts**: Visit `blog.html?admin=true` to access the admin panel
- Posts are stored in browser localStorage (no database needed)
- Supports basic Markdown formatting (headers, bold, italic, code blocks, links, lists)
- Features:
  - Add/Edit posts with title, excerpt, content, and tags
  - Posts are automatically sorted by date (newest first)
  - Responsive design matching the portfolio style

### Colors
- The color scheme can be customized in `css/styles.css` by modifying the CSS variables in the `:root` selector:
  ```css
  :root {
      --primary-color: #2563eb;
      --link-color: #2563eb;
      /* ... other colors */
  }
  ```

## Layout Structure

The portfolio uses a two-column layout:
- **Left Sidebar**: Profile information, photo, research interests, academic service
- **Right Main Content**: News, About, Publications, Projects, Education, Contact

On mobile devices, the layout automatically switches to a single column with the sidebar appearing below the main content.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- HTML5
- CSS3 (with CSS Variables and Grid Layout)
- Vanilla JavaScript
- Google Fonts (Inter)

## Notes

- The profile picture will show a placeholder if the image file is not found
- Make sure to update all placeholder text (`[Your Name]`, `[University Name]`, etc.)
- **CV/Resume**: Add your CV file to `assets/cv.pdf` - the link in the sidebar will automatically work
- All external links open in a new tab for better user experience
- **Blog**: Posts are stored in browser localStorage. To backup your posts, you can export the localStorage data
- Blog admin panel is accessible via `blog.html?admin=true`

## License

This portfolio template is free to use and modify for personal and commercial projects.
