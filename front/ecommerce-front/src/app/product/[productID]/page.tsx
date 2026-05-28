const DetailPage = async ({
  params,
}: {
  params: Promise<{ productID: string }>
}) => {

  const { productID } = await params;

  return (
    <div>
      DetailPage product nº {productID}
    </div>
  );
};

export default DetailPage;