import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ContactInfo = () => {
    return (
        <div>
            <h5 className="mb-4 text-lg font-semibold text-white">
                Contact Info
            </h5>
            <form>
                <div className="grid grid-cols-1 gap-5">
                    <div>
                        <Label className="mb-2 block text-purple-300/80">
                            Phone No.
                        </Label>
                        <Input
                            name="number"
                            id="number"
                            type="number"
                            placeholder="Phone"
                            className="border-purple-900/50 bg-[#0a0512] text-purple-100 placeholder:text-purple-300/40 focus-visible:ring-purple-600 focus-visible:ring-offset-0"
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block text-purple-300/80">
                            Website
                        </Label>
                        <Input
                            name="url"
                            id="url"
                            type="url"
                            placeholder="Url"
                            className="border-purple-900/50 bg-[#0a0512] text-purple-100 placeholder:text-purple-300/40 focus-visible:ring-purple-600 focus-visible:ring-offset-0"
                        />
                    </div>
                </div>
                {/*end grid*/}
                <Button
                    className="mt-5 bg-purple-600 text-white hover:bg-purple-500"
                    type="submit"
                >
                    Add
                </Button>
            </form>
        </div>
    );
};

export default ContactInfo;