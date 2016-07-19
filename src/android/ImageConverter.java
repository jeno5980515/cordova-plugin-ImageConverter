package jeno5980515.cordova;

import org.apache.cordova.*;
import org.apache.commons.codec.binary.Base64;
import org.json.JSONArray;
import org.json.JSONException;

import android.graphics.Bitmap;
import android.graphics.Bitmap.Config;
import android.graphics.BitmapFactory;

import java.util.Map;
import java.util.HashMap;
import java.io.ByteArrayOutputStream;
import java.io.IOException;


public class ImageConverter extends CordovaPlugin {

    public static Map<String, Bitmap> bitmapMap = new HashMap<String, Bitmap>();

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
 
        if ( action.equals("base64ToBitmap")) {
            String name = args.getString(0);
            String base64 = args.getString(1);
            base64 = base64.replaceFirst("^data:image/[^;]*;base64,?","");
            Bitmap bitmap = toBitmap(base64);
            bitmapMap.put(name,bitmap);
            callbackContext.success("success");
            return true;
        } else if ( action.equals("bitmapToBase64") ){
            String name = args.getString(0);
            String type = args.getString(1);
            int quality = Integer.valueOf(args.getString(2)) ;
            Boolean isPrefix = Boolean.valueOf(args.getString(3)) ;
            String base64 = "" ;
            if ( type.equals("PNG") ){
                base64 = toBase64(bitmapMap.get(name),Bitmap.CompressFormat.PNG, quality) ;
                if ( isPrefix == true ){
                    base64 = "data:image/png;base64," + base64 ;
                }
            } else if (type.equals("JPEG")) {
                base64 = toBase64(bitmapMap.get(name),Bitmap.CompressFormat.JPEG ,quality) ;
                if ( isPrefix == true ){
                    base64 = "data:image/jpeg;base64," + base64 ;
                }
            }                
            callbackContext.success(base64);
            return true ;
        } else {
            return false;

        }
    }

    public static Bitmap toBitmap(String input){
        byte[] decodedBytes = Base64.decodeBase64(input.getBytes());
        return BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.length);
    }

    public static String toBase64(Bitmap bitmap, Bitmap.CompressFormat compressFormat, int quality){
        ByteArrayOutputStream byteArrayOS = new ByteArrayOutputStream();
        bitmap.compress(compressFormat, quality, byteArrayOS);
        return new String(Base64.encodeBase64(byteArrayOS.toByteArray())) ;
    }
}
