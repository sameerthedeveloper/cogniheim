import Nav from './Nav';
import SiteFooter from './SiteFooter';

// Chrome shared by every secondary page: floating nav, a `main` landmark the
// footer's "Back to top" can target, and the common footer.
export default function PageShell({ children }) {
  return (
    <>
      <Nav />
      <main id="top">{children}</main>
      <SiteFooter />
    </>
  );
}
