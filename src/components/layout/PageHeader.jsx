/**
 * PageHeader.jsx
 * ------------------------------------------------------------------
 * Consistent header used at the top of every admin page: title,
 * optional subtitle, and a right-aligned slot for actions (a period
 * dropdown, a primary button, etc). Keeps Dashboard/Listings/Disputes
 * visually consistent without repeating markup.
 *
 * Usage:
 *   <PageHeader title="Platform overview" actions={<PeriodDropdown />} />
 * ------------------------------------------------------------------
 */
export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: "var(--font-display, 'Fraunces', serif)",
            fontSize: 22,
            fontWeight: 600,
            color: "var(--green-900, #163420)",
            margin: 0,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p style={{ color: "var(--text-muted, #66766A)", fontSize: 13, marginTop: 4 }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div style={{ display: "flex", gap: 10, alignItems: "center" }}>{actions}</div>}
    </div>
  );
}
