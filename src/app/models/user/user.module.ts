import { BicycleModule } from 'src/app/models/bicycle-model.model';
import { CardModule } from 'src/app/models/card.module';

export interface UserModule {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;
  userPhone: string;
  imageData: string;
  userBirthDate: Date;
  bicycles: BicycleModule[];
  cards: CardModule[];
}
