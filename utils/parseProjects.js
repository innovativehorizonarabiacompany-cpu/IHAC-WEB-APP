const categoryMap = {
  'electrical & instrumentation': 'Electrical',
  'mechanical works': 'Fabrication',
  'civil work': 'Civil',
  'hvac': 'HVAC',
};

export function parseProjectsTable(markdown) {
  const lines = markdown.split('\n');
  const projects = [];
  let inTable = false;

  for (const line of lines) {
    if (line.trimStart().startsWith('|')) {
      const cells = line.split('|').map(c => c.trim()).filter(Boolean);
      if (cells.length < 4) continue;

      const headerCheck = cells.join('').replace(/[-:]/g, '').trim();
      if (!headerCheck || cells.every(c => /^[-:]+$/.test(c.replace(/\s/g, '')))) {
        inTable = true;
        continue;
      }

      if (!inTable) continue;

      const sr = cells[0].replace(/[-\s]/g, '');
      const title = cells[1].replace(/\\n/g, ' ').trim();
      const nature = cells[2].replace(/\\n/g, ' ').trim();
      const yearStr = cells[3].replace(/\\n/g, ' ').trim();
      const year = parseInt(yearStr, 10) || 0;

      if (!title) continue;

      const lower = nature.toLowerCase();
      const category = categoryMap[lower] || nature || 'General';

      const desc = `IHAC ${category.toLowerCase()} project: ${title}.`;

      projects.push({
        id: projects.length + 1,
        title,
        category,
        year,
        description: desc,
      });
    } else {
      if (inTable) break;
    }
  }

  return projects;
}
