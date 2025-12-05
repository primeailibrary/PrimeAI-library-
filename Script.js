document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const openCategories = document.getElementById('openCategories');
  const catButtons = document.querySelectorAll('.cat-btn');
  const toolLists = document.querySelectorAll('.tools-list');
  const searchInput = document.getElementById('searchInput');

  // --- Sidebar toggle ---
  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    sidebar.setAttribute('aria-hidden', sidebar.classList.contains('open') ? 'false' : 'true');
  });

  // Close sidebar when clicking outside
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
      sidebar.classList.remove('open');
      sidebar.setAttribute('aria-hidden', 'true');
    }
  });

  // --- Sidebar AI Categories button: scroll to categories section ---
  openCategories.addEventListener('click', () => {
    sidebar.classList.remove('open');
    const catSection = document.getElementById('categoriesSection');
    if (catSection) {
      catSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // --- Category button click: show/hide the right tools list ---
  function hideAllToolLists() {
    toolLists.forEach(t => {
      t.style.display = 'none';
      t.classList.remove('visible');
    });
  }
  hideAllToolLists();

  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category; // e.g., 'image'
      const targetId = (cat === 'chatbot') ? 'chatbotTools' : (cat + 'Tools'); // mapping
      const target = document.getElementById(targetId);

      if (!target) return;

      // Hide others and show target
      hideAllToolLists();
      target.style.display = 'flex';
      target.style.animation = 'slideDown .28s ease both';
      setTimeout(()=> target.classList.add('visible'), 30);

      // smooth scroll to the tools area
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // --- Search functionality: filter categories and tool items ---
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    // filter category buttons (by label text)
    document.querySelectorAll('.cat-btn').forEach(btn => {
      const txt = btn.textContent.trim().toLowerCase();
      btn.style.display = txt.includes(q) || q === '' ? 'inline-block' : 'none';
    });

    // filter tool lists items
    document.querySelectorAll('.tools-list').forEach(list => {
      const links = Array.from(list.querySelectorAll('a'));
      let anyVisible = false;
      links.forEach(a => {
        const t = a.textContent.toLowerCase();
        if (t.includes(q) || q === '') {
          a.style.display = 'block';
          anyVisible = true;
        } else {
          a.style.display = 'none';
        }
      });
      // if query hides all tools of this list, hide list wrapper too
      list.style.display = anyVisible ? list.style.display || 'flex' : 'none';
    });
  });
});