# Resume Portfolio Site
A responsive personal portfolio website built with HTML, CSS, JavaScript, and Bootstrap, showcasing my skills and projects as a frontend developer and project management candidate. This repository documents various enhancements and ongoing development efforts through self-directed learning.

## Overview
This project includes multiple components improved to enhance user experience, performance, and creative design. Below are the key areas of development, reflecting my work on navbar usability, slider functionality, project portfolio, cloud transitions, and code optimization.

## Features
- Responsive design using Bootstrap, adaptable to desktop and mobile views.
- Interactive sliders and modals built with JavaScript and GSAP for animations.
- Media integration using Cloudinary for optimized image loading.
- Enhanced navbar with tooltip alignment and logo integration (Done-AC).
- Standardized slider sizes and refined hover/focus behavior across pages.
- Portfolio section for showcasing projects like computer building and graphic design.
- Seamless cloud transitions with planned looping animations.
- Modularized codebase for improved performance and maintainability.

## Technologies
- **HTML/CSS/JavaScript**: Core structure, styling, and interactivity.
- **Bootstrap**: Framework for responsive layout.
- **GSAP**: Animation library for smooth transitions.
- **Cloudinary**: Media management for performance.
- **Git/GitHub**: Version control and deployment.

## Project Structure
- `index.html`: Main page structure.
- `styles.css`: Custom CSS for styling and responsiveness.
- `otherStyles.css`: Additional styling for specific components.
- `scripts.js`: JavaScript for interactivity and animations.
- `mainModular.js`: Refactored index-specific behavior for optimization.
- `images/`: Folder for project images managed via Cloudinary.

## Projects and Enhancements

### 1. Navbar Enhancements
- **Description**: Improvements to the navigation bar for better usability and branding.
- **Features**:
  - Realigned 'Home' tooltip to the right on smaller devices for improved visibility (Done-AC).
  - Ensured navbar dropdowns display only in row layout, removing column behavior.
  - Added 'NailedIt' and 'Andrew Costigan' logos to the navbar for branding.
  - Removed underlining animation on 'Motion' dropdown hover for a cleaner look.
  - Fixed collapsed navbar 'Home' tooltip alignment and removed underline style (Done-AC).
- **Usage**: Hover over navbar items (e.g., 'Software', 'Motion') to see row-based dropdowns; resize to smaller devices (<991.98px) to test 'Home' tooltip.
- **Challenges and Solutions**:
  - **Challenge**: 'Home' tooltip misaligned on collapsed navbar; underline persisted.
  - **Solution**: Adjusted CSS positioning and removed text-decoration.
  - **Challenge**: Dropdowns showed column layout on some screens.
  - **Solution**: Forced `flex-direction: row !important` in media queries.
- **Future Improvements**:
  - Investigate sticky navbar logic rewrite for better responsiveness.
  - Add onclick functionality to 'Contact' to gather thumbnails.

### 2. Slider Improvements
- **Description**: Enhancements to slider components for consistency and performance.
- **Features**:
  - Standardized sizes for sliders 1 & 6 to match others on smaller devices.
  - Tuned hover/focus logic to cycle images only when sliders are in viewport, fixing titleBar text display (see scrollUtils.js for focus triggers).
  - Implemented resource optimization by pausing sliders outside viewport.
  - Fixed black space below 'Jordan' slider on photography.html.
- **Usage**: Hover or focus on sliders (e.g., slider 1) to cycle images when in viewport; check photography.html for resolved black space.
- **Challenges and Solutions**:
  - **Challenge**: Sliders 1 & 6 resized inconsistently on small screens.
  - **Solution**: Applied uniform `max-width` and `height` in media queries.
  - **Challenge**: Hover/focus caused cycling with no text in titleBars outside viewport.
  - **Solution**: Refined JavaScript to trigger animations only with viewport checks.
- **Future Improvements**:
  - Address Bootstrap slider disappearance at certain screen widths.
  - Implement lazy-loading for thumbnail images.

### 3. Project Portfolio
- **Description**: A section to showcase personal projects, including computer building and graphic design.
- **Features**:
  - Added 'Building This Computer' project (pictures pending).
  - Included Photoshop graphic design work (e.g., Heshams-shop, Brian Dolly artwork).
  - Planned to share processes used for each project.
- **Usage**: Browse the portfolio to see listed projects; check for updated images under 'Building This Computer' (TBD).
- **Challenges and Solutions**:
  - **Challenge**: Limited project photos available.
  - **Solution**: Planning to source and upload pictures for computer build.
  - **Challenge**: No process documentation yet.
  - **Solution**: Will add step-by-step descriptions in future updates.
- **Future Improvements**:
  - Upload pictures for 'Building This Computer'.
  - Detail processes (e.g., hardware assembly steps, design workflow).

### 4. Cloud Transitions
- **Description**: An animation feature for seamless cloud transitions between pages, starting with index.html.
- **Features**:
  - Implemented cloud transition with endpoint aligning to mountain sky animation start on index.html.
  - Planned a 3-point loop (cloud start → mountain sky start → cloud end → cloud start).
- **Usage**: View the cloud animation on page load or transition to index.html.
- **Challenges and Solutions**:
  - **Challenge**: Cloud transition endpoint misaligned with mountain sky.
  - **Solution**: Adjusted keyframes to sync start points (work in progress).
  - **Challenge**: Z-index issues with SVGs.
  - **Solution**: Planning to shift SVG z-index for layering consistency.
- **Future Improvements**:
  - Extend 3-point loop to other pages (e.g., photography.html).
  - Finalize z-index adjustments.

### 5. Modularization and Optimization
- **Description**: Refactoring and optimizing the codebase for performance and maintainability.
- **Features**:
  - Moved index-specific behavior to `mainModular.js` from `config` and `preload` for faster loading.
  - Planned lazy-loading for thumbnail images.
  - Repositioned WIP to match Modal on all pages (except index.html), with disable/enable closing WIP (Done-AC).
  - Hid scrollbar when WIP message shows.
  - Fine-tuned thumbnail overlay and WIP positioning (Done-AC).
  - Fixed thumbnail animation issues on index.html caused by photography.html changes (Done-AC).
- **Usage**: Observe faster page loads; test WIP and Modal positioning on non-index pages.
- **Challenges and Solutions**:
  - **Challenge**: `spaceOutThumbs()` behaved inconsistently on index.html.
  - **Solution**: Adjusted logic for correct form/modal closure (e.g., 'signature' issue).
  - **Challenge**: Close button on WIP not working on small screens.
  - **Solution**: Adjusted margin and re-enabled functionality (Done-AC).
- **Future Improvements**:
  - Implement lazy-loading for thumbnails.
  - Review performance impact of pre-loading all elements.
  - Enhance code formatting with extensions.

## Usage
- Navigate the site to view navbar, sliders, portfolio, and cloud animations.
- Resize to test responsive behavior (<991.98px) and hover/focus interactions.
- Check photography.html for specific fixes (e.g., 'Jordan' slider).

## Challenges and Solutions
- **Challenge**: Dropdown menus hid when moving the cursor, breaking user experience.
- **Solution**: Adjusted CSS with `:hover` and `flex-direction: row` to ensure persistence, inspired by a working stylesheet.
- **Challenge**: Thumbnail overlay worked inconsistently on smaller screens.
- **Solution**: Added overlay behavior to fade layer (Done-AC).
- **Challenge**: Blinking thumbnails accelerated over time.
- **Solution**: Maintained random, even pace (Done-AC).

## Future Improvements (General)
- Resolve navbar sticky logic rewrite by combining old and new functions.
- Adjust 'Me' element, thumbnails, modal, and form positioning for landscape screens <991.98px.
- Finalize duplicated `styles.css` into `pStyles.css` with new media queries.
- Ease 'Me' animations with `transition: all 0.4s ease-in-out`.
- Ensure site works online (e.g., GitHub Pages) with all elements loading correctly.

## Credits
- Inspired by Bootstrap documentation and GSAP tutorials on YouTube.
- Images sourced and optimized via Cloudinary.

## Contact
- Email: costigan.a@yahoo.com
- GitHub: [cosiee](https://github.com/cosiee)
## Contribution
Feel free to fork this repository and submit pull requests for improvements!