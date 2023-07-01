import { AccountCircle } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { PuffLoader } from "react-spinners";
import { api } from "~/utils/api";

import { toast } from "react-hot-toast";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const changeUsernameSchema = z.object({
  newUsername: z
    .string()
    .min(4, "Username is too short. It must be at least 4 letters"),
});
type ChangeUsername = z.infer<typeof changeUsernameSchema>;

const ProfileTab = () => {
  const session = useSession();
  const ctx = api.useContext();

  const [modal, setModal] = useState<null | "profile" | "username">(null);

  const { data, isLoading } = api.profile.getByIdPrivate.useQuery({
    userId: session.data?.user.id as string,
  });
  const { mutate: mutateUsername, isLoading: isMutatingUsername } =
    api.profile.changeUsername.useMutation({
      onSuccess: (newUsername) => {
        void ctx.profile.getByIdPrivate.invalidate;
        toast.success(
          `Successfully updated your profile visibility. Your profile is now ${newUsername} `
        );
      },
      onError: () => {
        toast.error("An error has occurred. Please try again later");
      },
    });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangeUsername>({
    resolver: zodResolver(changeUsernameSchema),
  });

  const { mutate: mutateProfileVis, isLoading: isMutatingProfileVis } =
    api.profile.changeProfileVisibility.useMutation({
      onSuccess: (newProfVis) => {
        void ctx.profile.getByIdPrivate.invalidate;
        toast.success(
          `Successfully updated your profile visibility. Your profile is now ${newProfVis} `
        );
      },
      onError: () => {
        toast.error("An error has occurred. Please try again later");
      },
    });

  const date = useMemo(
    () => data?.createdAt.toLocaleDateString(),
    [data?.createdAt]
  );
  const time = useMemo(
    () => data?.createdAt.toLocaleTimeString(),
    [data?.createdAt]
  );
  if (session.status !== "authenticated" || session.data === null)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center align-middle">
        <PuffLoader size={160} />
      </div>
    );

  return (
    <div className={`flex h-full w-full flex-col items-center align-middle `}>
      {isLoading || data === undefined ? (
        <PuffLoader />
      ) : (
        <>
          <div className="flex h-[160px] w-[160px] items-center justify-center rounded-full align-middle">
            {data.image ? (
              <Image
                src={data.image}
                alt={`profile image for user ${
                  data.name
                    ? ` ${data.name} at ${data.email}`
                    : `with the email ${data.email}`
                }`}
                width={120}
                height={120}
              />
            ) : (
              <AccountCircle className="!h-[120px] !w-[120px] " />
            )}
          </div>
          <div className="my-auto flex h-auto w-auto space-x-32">
            <div className="flex w-1/2 flex-col space-y-6 text-4xl text-green-300">
              <p>Username:</p>
              <p className="mb-10">Profile visibility:</p>

              <p>Email:</p>
              <p>Created at:</p>
            </div>

            <div className="flex w-1/2 flex-col space-y-6 text-4xl ">
              <button
                onClick={() => setModal("username")}
                className="w-min underline transition-all duration-300 hover:text-red-300"
              >
                {data.name ?? "set username"}
              </button>
              <button
                onClick={() => setModal("profile")}
                className="mb-10 w-min underline transition-all duration-300 hover:text-red-300"
              >
                {data.profileVisibility}
              </button>
              <p className="w-min transition-all duration-300 ">{data.email}</p>
              <p className=" w-min  whitespace-nowrap transition-all duration-300 ">
                {date === undefined || time === undefined ? (
                  <PuffLoader />
                ) : (
                  `${date} : ${time}`
                )}
              </p>
            </div>
          </div>
        </>
      )}

      {/* DIALOG BOX FOR PROFILE VISIBILITY  */}
      <Dialog
        open={modal === "profile"}
        onClose={() => setModal(null)}
        PaperProps={{
          className:
            "!bg-black !border-2 !border-green-900/40 !rounded-lg  !w-[50vw] !h-[50vh]",
        }}
        aria-labelledby="modal-box-profile-visibility"
      >
        <DialogTitle
          className="!w-full !text-center !font-serif  !text-4xl !text-white"
          id="modal-box-profile-visibility"
        >
          Change Profile Status
        </DialogTitle>
        <DialogContent
          className={`  !flex !flex-col !items-center !justify-center !align-middle`}
        >
          <DialogContentText className="!w-full !text-center !font-serif !text-3xl  !text-white">
            Would you like to make your profile public or private?
          </DialogContentText>
          <div className="mt-10 flex space-x-20">
            <button
              className="h-12 w-24  font-serif text-3xl !text-yellow-300 transition-all duration-300 hover:!text-red-300 disabled:text-gray-700"
              disabled={isMutatingProfileVis}
              onClick={() =>
                mutateProfileVis({ newProfileVisibility: "public" })
              }
            >
              Public
            </button>
            <button
              className="h-12 w-24  font-serif text-3xl !text-yellow-300 transition-all duration-300 hover:!text-red-300 disabled:text-gray-700"
              disabled={isMutatingProfileVis}
              onClick={() =>
                mutateProfileVis({ newProfileVisibility: "private" })
              }
            >
              Private
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* DIALOG BOX FOR USERNAME */}
      <Dialog
        open={modal === "username"}
        onClose={() => setModal(null)}
        PaperProps={{
          className:
            "!bg-black !border-2 !border-green-900/40 !rounded-lg  !w-[50vw] !h-[50vh]",
        }}
        aria-labelledby="modal-box-username"
      >
        <DialogTitle
          className="!mt-2 !w-full !text-center !font-serif !text-4xl  !text-white"
          id="modal-box-username"
        >
          Modify your username
        </DialogTitle>
        <DialogContent className={`!text-white`}>
          <DialogContentText className="!w-full !text-center !text-white">
            {`Input your ${
              data?.name === undefined ? "" : "new"
            } username if you would like to ${
              data?.name === undefined ? "have a" : "change your"
            } username `}
          </DialogContentText>
          <form
            onSubmit={void handleSubmit((e) => void mutateUsername(e))}
            className="flex w-full flex-col items-center justify-center gap-5 space-y-6 pt-10 align-middle"
          >
            <input
              className=" duration-300e w-1/2 appearance-none rounded bg-green-950 px-3  py-2 leading-tight text-green-200 transition-all placeholder:text-gray-700 focus:bg-green-700  focus:outline-none"
              {...register("newUsername")}
              type="text"
              placeholder="New Username"
            />
            {errors.newUsername && (
              <p className="text-red-200">{errors.newUsername.message}</p>
            )}
            <button
              className="flex w-48 items-center justify-center rounded bg-green-800 px-4 py-2 align-middle font-serif  text-white transition-all duration-300 hover:bg-green-700 focus:bg-green-700 focus:outline-none disabled:bg-gray-800"
              type="submit"
              disabled={isMutatingUsername}
            >
              {isMutatingUsername ? <PuffLoader size={20} /> : `submit`}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ProfileTab;
