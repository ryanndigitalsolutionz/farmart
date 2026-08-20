import PageHeader from "../../components/layout/PageHeader";

export default function Reports() {
  return (
    <div>
      <PageHeader title="Reports" subtitle="Platform performance overview" />
      <p style={{ color: "var(--text-muted, #66766A)", fontSize: 13.5 }}>
        Reporting charts (sales trends, top farmers, category breakdown) go here.
        This is a placeholder page — wire it up to real analytics endpoints once
        the backend report routes are ready.
      </p>
    </div>
  );
}