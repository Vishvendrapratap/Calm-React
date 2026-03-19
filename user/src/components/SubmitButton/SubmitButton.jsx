"use client";

export default function SubmitButton({ loading, label = "Submit Application" }) {
  return (
    <button
      type="submit"
      disabled={loading}
      style={{
        width: "100%",
        padding: "14px 0",
        background: loading ? "var(--primary-light)" : "var(--primary)",
        color: "#fff",
        border: "none",
        borderRadius: "var(--radius-sm)",
        fontSize: 16,
        fontWeight: 700,
        cursor: loading ? "not-allowed" : "pointer",
        transition: "background var(--transition)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      {loading ? (
        <>
          <span style={spinnerStyle} />
          Submitting...
        </>
      ) : (
        label
      )}
    </button>
  );
}

const spinnerStyle = {
  width: 18,
  height: 18,
  border: "2.5px solid rgba(255,255,255,.3)",
  borderTopColor: "#fff",
  borderRadius: "50%",
  animation: "spin .6s linear infinite",
};
