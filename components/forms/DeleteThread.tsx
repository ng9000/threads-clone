"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { deleteThread } from "@/lib/actions/thread.actions";
import ConformationModal from "../modal/ConformationModal";
import { useState } from "react";

interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

function DeleteThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  if (currentUserId !== authorId || pathname === "/") return null;

  const handleDelete = async () => {
    await deleteThread(JSON.parse(threadId), pathname);
    if (!parentId || !isComment) {
      router.push("/");
    }
  };

  return (
    <>
      <Image
        src="/assets/delete.svg"
        alt="delte"
        width={18}
        height={18}
        className="cursor-pointer object-contain"
        onClick={() => setShowModal(true)}
      />
      <ConformationModal
        setShowModal={setShowModal}
        showModal={showModal}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default DeleteThread;
