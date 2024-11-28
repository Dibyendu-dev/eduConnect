"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { changePassword } from "@/app/actions/account";

const ChangePassword = ({ email }) => {
  const [passwordState, setPasswordState] = useState({
    oldPassword: "",
    newPassword: "",
  });

  function handleChange(event) {
    const field = event.target.name;
    const value = event.target.value;
    setPasswordState({
      ...passwordState,
      [field]: value,
    });
  }

  async function doPasswordChange(event) {
    event.preventDefault();
    try {
      await changePassword(
        email,
        passwordState.oldPassword,
        passwordState.newPassword
      );
      toast.success("Updated Successfully");
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.message}`);
    }
  }

  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Change password :</h5>
      <form onSubmit={doPasswordChange}>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">Old password :</Label>
            <Input
              type="password"
              placeholder="Old password"
              id="oldPassword"
              name="oldPassword"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label className="mb-2 block">New password :</Label>
            <Input
              type="password"
              placeholder="New password"
              id="newPassword"
              name="newPassword"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label className="mb-2 block">Re-type New password :</Label>
            <Input
              type="password"
              placeholder="Re-type New password"
              required=""
            />
          </div>
        </div>
        {/*end grid*/}
        <Button className="mt-5 cursor-pointer" type="submit">
          Save password
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
