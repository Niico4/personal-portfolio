export const WikiJsonLd = ({ value }: { value: object }) => (
  <script type="application/ld+json">
    {JSON.stringify(value).replaceAll('<', '\\u003c')}
  </script>
);
