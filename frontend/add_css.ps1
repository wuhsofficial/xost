$css = @"

/* ─── Mobile Horizontal Scroll Override ─── */
@media (max-width: 768px) {
  .statsGrid, .bentoGridLarge, .cardGrid, .jobsGrid, .benefitsGrid {
    display: flex !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    scroll-snap-type: x mandatory;
    padding-bottom: 1.5rem !important;
    -webkit-overflow-scrolling: touch;
    gap: 1rem !important;
  }
  .statCard, .bentoCard, .contentCard, .jobCard, .benefitCard {
    flex: 0 0 85% !important;
    scroll-snap-align: center;
    max-width: 85vw;
  }
  .statsGrid::-webkit-scrollbar, .bentoGridLarge::-webkit-scrollbar, .cardGrid::-webkit-scrollbar, .jobsGrid::-webkit-scrollbar, .benefitsGrid::-webkit-scrollbar { display: none; }
  .statsGrid, .bentoGridLarge, .cardGrid, .jobsGrid, .benefitsGrid { -ms-overflow-style: none; scrollbar-width: none; }
}
"@

$files = @(
  "src\pages\SubPageTemplate\templates\ServicesPages\ServicesPages.module.css",
  "src\pages\SubPageTemplate\templates\SolutionsPages\SolutionsPages.module.css",
  "src\pages\SubPageTemplate\templates\IndustriesPages\IndustriesPages.module.css",
  "src\pages\SubPageTemplate\templates\InsightsPages\InsightsPages.module.css",
  "src\pages\CareersPages\OfferedJobs.module.css"
)

foreach ($f in $files) {
  if (Test-Path $f) {
    Add-Content -Path $f -Value $css
  }
}
