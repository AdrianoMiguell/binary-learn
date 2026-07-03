import { Button } from "../ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function QuestaoStartDialog() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogHeader>
        <DialogTitle>
          Vamos responder as questões e passar desse nível?
        </DialogTitle>
        <DialogDescription>
          Vamos responder todas as questões a seguir
        </DialogDescription>
        <DialogFooter>
          <Button type="button">Iniciar</Button>
        </DialogFooter>
      </DialogHeader>
    </Dialog>
  );
}
