const AccountLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-800">
      <div className="grid h-3/5 w-3/5 grid-cols-2 rounded-lg bg-gray-50 max-lg:grid-cols-1">
        <div className="flex items-center justify-center rounded-l-lg bg-cyan-600 text-4xl">
          Parking+
        </div>
        <div className="flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
