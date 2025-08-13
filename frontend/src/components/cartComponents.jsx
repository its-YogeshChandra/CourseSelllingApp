import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Edit, X } from "lucide-react";
import visa from "../assets/Visa_2021.svg";
import mastercard from "../assets/Mastercard_2019_logo.svg";
import paypal from "../assets/PayPal_Logo_Icon_2014.svg";
import { useEffect } from "react";
import { courseServices } from "../services/courseService";

export default function CheckoutPage({ courseId }) {
  const [paymentMethod, setPaymentMethod] = useState("debit-credit");
  const [cartItems, setCartItems] = useState([
    {
      _id: 1,
      title: "E-commerce daily blog",
      subtitle: "BLOG POST: Agile Frameworks for Business",
      price: "£10.00",
    },
    {
      _id: 2,
      title: "Leadership tips for entrepreneurs",
      subtitle: "BLOG POST: Business Tips",
      price: "£20.00",
    },
  ]);
  const [cartPrice, setCartPrice] = useState("£30.00");

  // function to add items to the cart
  useEffect(() => {
    // This is where you would typically fetch cart items from an API or local storage
    const func = async () => {
      const combinedData = await courseServices.getCourseandLessonData(
        courseId
      );
      console.log(combinedData);

      if (!combinedData) return;
      else {
        const courseData = combinedData.data.course;
        // Check if courseData is defined and set the cart items accordingly
        if (courseData != undefined) {
          const pricekeyArr = [
            { currency: "GBP", icon: "£" },
            { currency: "USD", icon: "$" },
            { currency: "INR", icon: "₹" },
            { currency: "EUR", icon: "€" },
          ];
          pricekeyArr.map((e) => {
            if (e.currency == courseData.price.currency) {
              const displayPrice = e.icon + courseData.price.price;
              console.log(displayPrice);
              setCartItems((prev) => [
                {
                  ...prev,
                  _id: courseData._id,
                  title: courseData.title,
                  category: courseData.category,
                  thumbnail: courseData.thumbnail,
                },
              ]);
              setCartPrice(displayPrice);
            }
          });
        }
      }
    };
    func();
  }, [courseId]);

  // Log the cart items to see what is being displayed
  console.log(cartItems);

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
    //clear the cart price if no items left
    if (cartItems.length === 1) {
      setCartPrice(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 font-inter">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="space-y-8">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>

          {/* Cart Items - Full Width */}
          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <div className="p-8 bg-white rounded-lg border text-center">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-start space-x-4 p-4 bg-white rounded-lg border"
                >
                  <div className="w-4 h-4 border-2 border-blue-600 rounded-sm bg-blue-600 flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-sm m-0.5"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        {/* <p className="text-sm text-gray-600">{item.subtitle}</p> */}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit details
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeItem(item._id)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Payment and Order Details Side by Side */}
          {cartPrice != null ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Payment method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value="debit-credit" id="debit-credit" />
                      <Label
                        htmlFor="debit-credit"
                        className="flex items-center space-x-4 cursor-pointer flex-1"
                      >
                        <span>Debit card/Credit card</span>
                        <div className="flex items-center space-x-2 ml-auto">
                          <img
                            src={visa}
                            alt="Visa"
                            width={38}
                            height={24}
                            className="rounded"
                          />
                          <img
                            src={mastercard}
                            alt="Mastercard"
                            width={38}
                            height={24}
                            className="rounded"
                          />
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label
                        htmlFor="paypal"
                        className="flex items-center space-x-4 cursor-pointer flex-1"
                      >
                        <span>PayPal</span>
                        <div className="flex items-center space-x-2 ml-auto">
                          <img
                            src={paypal}
                            alt="PayPal"
                            width={36}
                            height={24}
                            className="rounded"
                          />
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* Card Details Form - Only show when debit-credit is selected */}
                  {paymentMethod === "debit-credit" && (
                    <div className="space-y-4 pt-4">
                      <div>
                        <Label
                          htmlFor="cardholder-name"
                          className="text-sm font-medium text-gray-700"
                        >
                          Cardholder name
                        </Label>
                        <Input
                          id="cardholder-name"
                          defaultValue="TAYLOR DURDON"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="card-number"
                          className="text-sm font-medium text-gray-700"
                        >
                          Card number
                        </Label>
                        <div className="relative mt-1">
                          <Input
                            id="card-number"
                            defaultValue="4591 6945 8666 5645"
                            className="pr-12"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CreditCard className="w-5 h-5 text-red-500" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="expiry-date"
                            className="text-sm font-medium text-gray-700"
                          >
                            Expiry date
                          </Label>
                          <Input
                            id="expiry-date"
                            defaultValue="10/23"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="cvc"
                            className="text-sm font-medium text-gray-700"
                          >
                            CVC
                          </Label>
                          <Input id="cvc" defaultValue="•••" className="mt-1" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PayPal Message - Only show when PayPal is selected */}
                  {paymentMethod === "paypal" && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        You will be redirected to PayPal to complete your
                        payment securely.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Order Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">$26.97</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">$6.00</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{cartPrice}</span>
                  </div>

                  <Button
                    className="w-full bg-red-400 hover:bg-red-500 text-white py-3 text-base font-medium"
                    onClick={() => {
                      if (paymentMethod === "paypal") {
                        alert("Redirecting to PayPal...");
                        // Here you would integrate with PayPal SDK
                      } else {
                        alert("Processing card payment...");
                        // Here you would process card payment
                      }
                    }}
                  >
                    {paymentMethod === "paypal" ? "Pay with PayPal" : "Pay now"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No items in the cart to display.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
