# Manual Testing Checklist
**Good Deeds Day Landing Page**

Use this checklist when performing manual browser testing.

---

## Quick Start

1. **Start Server:**
   ```bash
   python3 -m http.server 8888
   ```

2. **Open Browser:**
   ```
   http://localhost:8888/index.html
   ```

---

## Test 1: Language Switching ✅

### Hebrew (Default):
- [ ] Page loads with Hebrew text
- [ ] Direction is RTL (text aligns right)
- [ ] Hebrew button highlighted (teal background)
- [ ] Title: "יום המעשים הטובים: הכוח להיות טוב!"

### Switch to English:
- [ ] Click "EN" button
- [ ] All text changes to English
- [ ] Direction changes to LTR (text aligns left)
- [ ] English button highlighted
- [ ] Title: "Good Deeds Day: The Power to Be Good!"

### Switch to Russian:
- [ ] Click "RU" button
- [ ] All text changes to Russian
- [ ] Direction remains LTR
- [ ] Russian button highlighted
- [ ] Title: "День добрых дел: Сила быть добрым!"

### Switch back to Hebrew:
- [ ] Click "HE" button
- [ ] Returns to Hebrew
- [ ] Direction changes back to RTL

---

## Test 2: localStorage Persistence ✅

### Test Procedure:
1. [ ] Select English language
2. [ ] Refresh page (Cmd+R or F5)
3. [ ] Verify page loads in English (not Hebrew)
4. [ ] Select Russian
5. [ ] Refresh page
6. [ ] Verify page loads in Russian
7. [ ] Open DevTools > Application > Local Storage
8. [ ] Verify `preferredLanguage` key exists with correct value

---

## Test 3: Mobile Responsiveness ✅

### Setup:
- [ ] Open Chrome DevTools (F12)
- [ ] Click device toolbar icon (or Cmd+Shift+M)

### Test Screen Sizes:

**Mobile (375px - iPhone SE):**
- [ ] Language buttons stack vertically
- [ ] Language text shows "HE" / "EN" / "RU" (not full names)
- [ ] Logo is smaller (128px)
- [ ] Heading text is smaller (text-5xl)
- [ ] Tip cards show 1 per row
- [ ] All content fits without horizontal scroll
- [ ] Touch targets are large enough (min 44px)

**Tablet (768px - iPad):**
- [ ] Language buttons in horizontal row
- [ ] Language text shows full names ("עברית" / "English" / "Русский")
- [ ] Logo is larger (160px)
- [ ] Heading text is larger (text-7xl)
- [ ] Tip cards show 2 per row

**Desktop (1024px - iPad Pro):**
- [ ] Full layout visible
- [ ] Tip cards in 2-column grid
- [ ] Proper spacing and margins

**Large Desktop (1440px+):**
- [ ] Content centered
- [ ] Maximum width constraints applied
- [ ] No excessive white space

---

## Test 4: Interactive Elements ✅

### Language Buttons:
- [ ] Hover effect works (teal background)
- [ ] Click changes language immediately
- [ ] Active state shows visual feedback (scale down)
- [ ] Keyboard navigation works (Tab to focus)
- [ ] Enter key activates button

### CTA Button ("Ready to spread goodness?"):
- [ ] Button is visible and prominent
- [ ] Hover effect: Changes to yellow background, scales up
- [ ] Click shows alert in current language:
  - Hebrew: "כל הכבוד! העולם כבר נראה טוב יותר בזכותכם!"
  - English: "Well done! The world already looks better because of you!"
  - Russian: "Молодец! Мир уже выглядит лучше благодаря вам!"
- [ ] Keyboard Enter key works

### Share Button:
- [ ] Button is visible in Share section
- [ ] Hover effect: Teal color darkens
- [ ] Click shows alert in current language:
  - Hebrew: "איזה רעיון מדהים! תודה ששיתפתם אותנו!"
  - English: "What an amazing idea! Thank you for sharing!"
  - Russian: "Какая замечательная идея! Спасибо, что поделились!"
- [ ] Keyboard Enter key works

### Textarea:
- [ ] Can click and type text
- [ ] Placeholder text changes with language
- [ ] Focus state shows teal ring
- [ ] Keyboard navigation works (Tab to focus)

### Footer Icons:
- [ ] Three emoji icons visible (🌍 ❤️ ✨)
- [ ] Hover effect: Color appears (from grayscale)
- [ ] Hover effect: Icon grows larger (scale 125%)
- [ ] Smooth animation (300ms)

### Tip Cards:
- [ ] All 4 cards visible
- [ ] Hover effect: Card lifts up (translateY -10px)
- [ ] Hover effect: Image zooms in (scale 110%)
- [ ] Smooth animations
- [ ] Click/tap works on mobile

---

## Test 5: Visual Elements ✅

### Hero Section:
- [ ] Logo displays and floats (animation)
- [ ] Main heading is large and bold
- [ ] Hashtag badge visible at top
- [ ] Scroll arrow bounces at bottom
- [ ] Gradient background is teal
- [ ] Diagonal clip-path visible

### Tip Cards:
- [ ] All 4 images load correctly:
  1. Child smiling (😊)
  2. Girls studying (📚)
  3. Friends laughing (💬)
  4. Kids collecting litter (♻️)
- [ ] Colored badges visible in top-right of each card:
  - Card 1: Teal badge
  - Card 2: Purple badge
  - Card 3: Yellow badge
  - Card 4: Orange badge
- [ ] Card shadows visible
- [ ] Colored bottom borders visible

### Footer:
- [ ] Logo displays (smaller version)
- [ ] Three emoji icons visible
- [ ] Copyright text visible
- [ ] "BE KIND • BE COOL • BE YOU" text visible

---

## Test 6: Browser Compatibility ✅

Test in each browser:

### Chrome/Edge:
- [ ] All features work
- [ ] Animations smooth
- [ ] Backdrop blur works
- [ ] No console errors

### Firefox:
- [ ] All features work
- [ ] Animations smooth
- [ ] Backdrop blur works
- [ ] No console errors

### Safari (Desktop):
- [ ] All features work
- [ ] Animations smooth
- [ ] Backdrop blur works (may need -webkit prefix)
- [ ] No console errors

### Safari (iOS):
- [ ] All features work on iPhone
- [ ] Touch targets work well
- [ ] Animations smooth
- [ ] No console errors
- [ ] Viewport scaling correct

---

## Test 7: Accessibility ✅

### Keyboard Navigation:
1. [ ] Tab to first element (HE button)
2. [ ] Tab through all language buttons
3. [ ] Tab to CTA button
4. [ ] Tab to textarea
5. [ ] Tab to Share button
6. [ ] Focus visible on all elements
7. [ ] Enter key activates buttons
8. [ ] No keyboard traps

### Screen Reader (Optional):
- [ ] Turn on VoiceOver (Mac: Cmd+F5) or NVDA (Windows)
- [ ] Navigate through page
- [ ] Verify all text is read
- [ ] Verify image alt text is read
- [ ] Verify button labels are clear
- [ ] Verify language changes are announced

### Color Contrast:
- [ ] All text is readable
- [ ] No low-contrast combinations
- [ ] Buttons have clear borders/backgrounds

---

## Test 8: Performance ✅

### Network Tab:
1. [ ] Open DevTools > Network tab
2. [ ] Refresh with cache disabled (Cmd+Shift+R)
3. [ ] Verify resources load:
   - [ ] index.html (~15 KB)
   - [ ] Tailwind CSS (~100 KB)
   - [ ] Google Fonts (~20 KB)
   - [ ] translations.js (~6 KB)
   - [ ] app.js (~4 KB)
   - [ ] logo.png (~399 KB) ⚠️ Large, needs optimization
   - [ ] 4 tip images (~800 KB total)
4. [ ] Total load time < 3 seconds on normal connection

### Console Tab:
- [ ] No errors (red messages)
- [ ] No warnings (yellow messages)
- [ ] Only expected logs (if any)

### Lighthouse (Optional):
1. [ ] Open DevTools > Lighthouse tab
2. [ ] Select: Performance, Accessibility, Best Practices, SEO
3. [ ] Click "Analyze page load"
4. [ ] Expected scores:
   - Performance: 85-95
   - Accessibility: 95-100
   - Best Practices: 90-95
   - SEO: 90-100

---

## Test 9: Edge Cases ✅

### localStorage Disabled:
1. [ ] Disable localStorage (DevTools > Application > Local Storage > Clear)
2. [ ] Refresh page
3. [ ] Verify page loads in default Hebrew
4. [ ] Language switching still works

### Slow Network:
1. [ ] DevTools > Network tab
2. [ ] Throttle to "Slow 3G"
3. [ ] Refresh page
4. [ ] Verify:
   - [ ] Page loads (may be slow)
   - [ ] Content appears progressively
   - [ ] No broken elements
   - [ ] Logo loads with "eager" priority

### Images Blocked:
1. [ ] DevTools > Network tab
2. [ ] Block image requests (or disable images in browser settings)
3. [ ] Refresh page
4. [ ] Verify alt text displays for all images

---

## Test 10: Content Accuracy ✅

### Hebrew:
- [ ] All text is grammatically correct
- [ ] RTL layout looks natural
- [ ] No English text visible (except emojis/flags)
- [ ] Hashtag: #יום_המעשים_הטובים

### English:
- [ ] All text is grammatically correct
- [ ] LTR layout looks natural
- [ ] No Hebrew/Russian text visible
- [ ] Hashtag: #GoodDeedsDay

### Russian:
- [ ] All text is grammatically correct
- [ ] LTR layout looks natural
- [ ] No Hebrew/English text visible
- [ ] Hashtag: #ДеньДобрыхДел

### Verify Translations Match:
- [ ] Hero heading conveys same message in all 3 languages
- [ ] Tip card 1 (Smiling) content matches
- [ ] Tip card 2 (Homework) content matches
- [ ] Tip card 3 (Compliment) content matches
- [ ] Tip card 4 (Trash) content matches
- [ ] CTA section message matches
- [ ] Share section message matches
- [ ] Footer copyright matches

---

## Common Issues & Solutions

### Issue: Images don't load
**Solution:**
- Check internet connection (images from lh3.googleusercontent.com)
- Verify logo.png exists in images/ folder
- Check browser console for 404 errors

### Issue: Tailwind styles missing
**Solution:**
- Check internet connection (Tailwind from CDN)
- Verify script tag: `https://cdn.tailwindcss.com?plugins=forms,container-queries`
- Check for console errors

### Issue: Font looks wrong
**Solution:**
- Check internet connection (Google Fonts)
- Verify link tag: Google Fonts Heebo
- Check computed styles in DevTools

### Issue: Language won't switch
**Solution:**
- Check console for JavaScript errors
- Verify translations.js loaded
- Verify app.js loaded
- Check that scripts are at end of body

### Issue: localStorage not persisting
**Solution:**
- Check if localStorage enabled in browser
- Verify no browser extensions blocking
- Check Application tab in DevTools
- Try different browser

---

## Final Checklist

Before marking as complete:

- [ ] All 10 test sections passed
- [ ] Tested in at least 2 browsers
- [ ] Tested on mobile device (or simulator)
- [ ] No console errors
- [ ] All images load
- [ ] All languages work
- [ ] localStorage persists
- [ ] Accessibility checks passed
- [ ] Performance acceptable
- [ ] Ready for production

---

**Tester Name:** ________________
**Date:** ________________
**Browsers Tested:** ________________
**Mobile Devices Tested:** ________________
**Issues Found:** ________________

**Status:**
- [ ] PASS - Ready for production
- [ ] FAIL - Issues need fixing

**Notes:**
_________________________________
_________________________________
_________________________________
