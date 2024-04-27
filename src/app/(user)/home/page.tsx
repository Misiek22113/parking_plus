import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from '@/components/ui/table';

export default function Home() {
  return (
    <div className="grid h-full w-full grid-flow-col grid-rows-2 gap-4 p-16">
      <Card title="Parking places">
        <CardHeader>
          <CardTitle>Order parking place</CardTitle>
          <CardDescription>
            In order to park your car, you need to order a parking spot. You can
            do it here. The parking spot will be reserved for you till the time
            you leave the parking lot. The parking spot will be picked
            automatically for you.
          </CardDescription>
        </CardHeader>
        <CardContent>Click the button to order parking spot</CardContent>
        <CardFooter>
          <Button>Order</Button>
        </CardFooter>
      </Card>
      <Card title="Account funds">
        <CardHeader>
          <CardTitle>Add funds to your account</CardTitle>
          <CardDescription>
            Your fundings are used to pay for parking spots. You can add funds
            to the account here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          Select the payment method to add funds to your account
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button>Demo</Button>
          <Button disabled>Google Pay</Button>
          <Button disabled>BLIK</Button>
        </CardFooter>
      </Card>
      <Card title="Account info" className="row-span-2">
        <CardHeader className=" bg-muted">
          <CardTitle>Your account information</CardTitle>
          <CardDescription>
            All of your account information is stored here. You can see your ID,
            balance and other information.
            <p className="pt-2 text-lg">Your account ID: 123456</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="h-1/2 pt-4">
          <p className="text-lg">Your account balance</p>
          <p className="py-2 text-4xl font-bold">100 PLN</p>
          <Separator className="my-4" />
          <p className="text-lg">Your account history</p>
          <ScrollArea className="h-full">
            <Table>
              <TableCaption>A list of your recent reservations.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Reservation</TableHead>
                  <TableHead>Spot</TableHead>
                  <TableHead>Car license</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">1239012</TableCell>
                    <TableCell>17</TableCell>
                    <TableCell>CT2180X</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

// import {
//   ChevronLeft,
//   ChevronRight,
//   Copy,
//   CreditCard,
//   MoreVertical,
//   Truck,
// } from 'lucide-react';

// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
// } from '@/components/ui/pagination';
// import { Separator } from '@/components/ui/separator';

// export function Component() {
//   return (
//     <Card className="overflow-hidden">
//       <CardHeader className="flex flex-row items-start bg-muted/50">
//         <div className="grid gap-0.5">
//           <CardTitle className="group flex items-center gap-2 text-lg">
//             Order Oe31b70H
//             <Button
//               size="icon"
//               variant="outline"
//               className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
//             >
//               <Copy className="h-3 w-3" />
//               <span className="sr-only">Copy Order ID</span>
//             </Button>
//           </CardTitle>
//           <CardDescription>Date: November 23, 2023</CardDescription>
//         </div>
//         <div className="ml-auto flex items-center gap-1">
//           <Button size="sm" variant="outline" className="h-8 gap-1">
//             <Truck className="h-3.5 w-3.5" />
//             <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
//               Track Order
//             </span>
//           </Button>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button size="icon" variant="outline" className="h-8 w-8">
//                 <MoreVertical className="h-3.5 w-3.5" />
//                 <span className="sr-only">More</span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem>Edit</DropdownMenuItem>
//               <DropdownMenuItem>Export</DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Trash</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </CardHeader>
//       <CardContent className="p-6 text-sm">
//         <div className="grid gap-3">
//           <div className="font-semibold">Order Details</div>
//           <ul className="grid gap-3">
//             <li className="flex items-center justify-between">
//               <span className="text-muted-foreground">
//                 Glimmer Lamps x <span>2</span>
//               </span>
//               <span>$250.00</span>
//             </li>
//             <li className="flex items-center justify-between">
//               <span className="text-muted-foreground">
//                 Aqua Filters x <span>1</span>
//               </span>
//               <span>$49.00</span>
//             </li>
//           </ul>
//           <Separator className="my-2" />
//           <ul className="grid gap-3">
//             <li className="flex items-center justify-between">
//               <span className="text-muted-foreground">Subtotal</span>
//               <span>$299.00</span>
//             </li>
//             <li className="flex items-center justify-between">
//               <span className="text-muted-foreground">Shipping</span>
//               <span>$5.00</span>
//             </li>
//             <li className="flex items-center justify-between">
//               <span className="text-muted-foreground">Tax</span>
//               <span>$25.00</span>
//             </li>
//             <li className="flex items-center justify-between font-semibold">
//               <span className="text-muted-foreground">Total</span>
//               <span>$329.00</span>
//             </li>
//           </ul>
//         </div>
//         <Separator className="my-4" />
//         <div className="grid grid-cols-2 gap-4">
//           <div className="grid gap-3">
//             <div className="font-semibold">Shipping Information</div>
//             <address className="grid gap-0.5 not-italic text-muted-foreground">
//               <span>Liam Johnson</span>
//               <span>1234 Main St.</span>
//               <span>Anytown, CA 12345</span>
//             </address>
//           </div>
//           <div className="grid auto-rows-max gap-3">
//             <div className="font-semibold">Billing Information</div>
//             <div className="text-muted-foreground">
//               Same as shipping address
//             </div>
//           </div>
//         </div>
//         <Separator className="my-4" />
//         <div className="grid gap-3">
//           <div className="font-semibold">Customer Information</div>
//           <dl className="grid gap-3">
//             <div className="flex items-center justify-between">
//               <dt className="text-muted-foreground">Customer</dt>
//               <dd>Liam Johnson</dd>
//             </div>
//             <div className="flex items-center justify-between">
//               <dt className="text-muted-foreground">Email</dt>
//               <dd>
//                 <a href="mailto:">liam@acme.com</a>
//               </dd>
//             </div>
//             <div className="flex items-center justify-between">
//               <dt className="text-muted-foreground">Phone</dt>
//               <dd>
//                 <a href="tel:">+1 234 567 890</a>
//               </dd>
//             </div>
//           </dl>
//         </div>
//         <Separator className="my-4" />
//         <div className="grid gap-3">
//           <div className="font-semibold">Payment Information</div>
//           <dl className="grid gap-3">
//             <div className="flex items-center justify-between">
//               <dt className="flex items-center gap-1 text-muted-foreground">
//                 <CreditCard className="h-4 w-4" />
//                 Visa
//               </dt>
//               <dd>**** **** **** 4532</dd>
//             </div>
//           </dl>
//         </div>
//       </CardContent>
//       <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
//         <div className="text-xs text-muted-foreground">
//           Updated <time dateTime="2023-11-23">November 23, 2023</time>
//         </div>
//         <Pagination className="ml-auto mr-0 w-auto">
//           <PaginationContent>
//             <PaginationItem>
//               <Button size="icon" variant="outline" className="h-6 w-6">
//                 <ChevronLeft className="h-3.5 w-3.5" />
//                 <span className="sr-only">Previous Order</span>
//               </Button>
//             </PaginationItem>
//             <PaginationItem>
//               <Button size="icon" variant="outline" className="h-6 w-6">
//                 <ChevronRight className="h-3.5 w-3.5" />
//                 <span className="sr-only">Next Order</span>
//               </Button>
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//       </CardFooter>
//     </Card>
//   );
// }
